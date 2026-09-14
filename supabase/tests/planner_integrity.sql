begin;
select set_config('request.jwt.claims', json_build_object('sub',(select id from public.profiles where role='owner' limit 1),'role','authenticated')::text,true);
set local role authenticated;
do $$
declare w uuid; s uuid; a uuid; n integer;
begin
 insert into public.workers(name,email,role,status) values ('Verification temporary','test@example.invalid','worker','available') returning id into w;
 insert into public.stations(name,active) values ('Verification temporary',true) returning id into s;
 insert into public.assignments("workerId","stationId",date) values(w,s,'2099-01-05') returning id into a;
 begin
   insert into public.assignments("workerId","stationId",date) values(w,s,'2099-01-05');
   raise exception 'TEST FAILED: duplicate allowed';
 exception when unique_violation then null; end;
 begin
   insert into public.assignments("workerId","stationId",date) values(w,s,'2099-02-30');
   raise exception 'TEST FAILED: invalid date allowed';
 exception when datetime_field_overflow then null; end;
 insert into public.assignments("workerId","stationId",date) values(w,s,'2099-01-12');
 perform public.update_worker_for_week(jsonb_build_object('id',w,'name','Verification temporary','email','test@example.invalid','role','worker','status','sick'),'2099-01-05');
 select count(*) into n from public.assignments where "workerId"=w;
 if n <> 1 then raise exception 'TEST FAILED: other week was removed'; end if;
 update public.assignments set note='Note remains editable' where "workerId"=w;
 begin
   insert into public.assignments("workerId","stationId",date) values(w,s,'2099-01-13');
   raise exception 'TEST FAILED: unavailable worker allowed';
 exception when raise_exception then if SQLERRM = 'TEST FAILED: unavailable worker allowed' then raise; end if; end;
 delete from public.assignments where "workerId"=w;
 delete from public.workers where id=w;
 delete from public.stations where id=s;
end $$;
reset role;
select set_config('request.jwt.claims','{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
set local role authenticated;
do $$ begin
 begin
 insert into public.workers(name,email,role,status) values ('Denied','denied@example.invalid','worker','available');
 raise exception 'TEST FAILED: unprivileged write succeeded';
 exception when insufficient_privilege then null; end;
end $$;
reset role;
set local role anon;
do $$ begin
 begin perform 1 from public.workers limit 1; raise exception 'TEST FAILED: public worker access'; exception when insufficient_privilege then null; end;
end $$;
reset role;
select 'PASS: owner CRUD, double booking, valid dates, atomic selected-week cleanup, note edits, unavailable-worker rejection, unprivileged writes, anonymous read denial' as result;
rollback;
