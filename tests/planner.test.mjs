import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
const output = mkdtempSync(join(tmpdir(), 'shiftplanner-tests-'))
execFileSync('./node_modules/.bin/tsc', ['--ignoreConfig','--skipLibCheck','--target','es2022','--module','commonjs','--outDir',output,'src/lib/plannerRules.ts','src/lib/dateUtils.ts'])
const require = createRequire(import.meta.url)
const { assignmentProblem } = require(join(output,'lib/plannerRules.js'))
const { toDateKey, fromDateKey, getMondayOfWeek } = require(join(output,'lib/dateUtils.js'))
const worker = { id:'w', status:'available' }
const station = { id:'s', active:true }
const date = fromDateKey('2026-09-14')
const assignment = { id:'a', workerId:'w', stationId:'s', date }
test('calendar dates round trip across timezones', () => {
  for (const zone of ['Europe/Vienna','America/Los_Angeles','Pacific/Auckland']) {
    process.env.TZ=zone
    assert.equal(toDateKey('2026-09-14'),'2026-09-14')
    assert.equal(toDateKey(fromDateKey('2026-03-29')),'2026-03-29')
  }
})
test('Sunday resolves to preceding Monday', () => assert.equal(toDateKey(getMondayOfWeek(fromDateKey('2026-09-20'))),'2026-09-14'))
test('free cell accepts worker', () => assert.equal(assignmentProblem(worker,station,date,[]),null))
test('worker double-booking rejected', () => assert.match(assignmentProblem(worker,{id:'other',active:true},date,[assignment]),/worker already/))
test('station double-booking rejected', () => assert.match(assignmentProblem({id:'other',status:'available'},station,date,[assignment]),/station already/))
test('moving an assignment ignores its own booking', () => assert.equal(assignmentProblem(worker,station,date,[assignment],'a'),null))
test('unavailable workers and inactive stations rejected', () => {
 assert.match(assignmentProblem({...worker,status:'sick'},station,date,[]),/unavailable/)
 assert.match(assignmentProblem(worker,{...station,active:false},date,[]),/inactive/)
})
test('invalid dates rejected', () => assert.match(assignmentProblem(worker,station,new Date('invalid'),[]),/valid date/))
