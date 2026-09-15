import { supabase } from '../lib/supabase'
export interface AuditEvent { id: number; actor_id: string | null; action: string; entity_type: string; entity_id: string | null; created_at: string }
export async function loadAuditEvents() { const { data, error } = await supabase.from('security_audit_log').select('id,actor_id,action,entity_type,entity_id,created_at').order('created_at', { ascending: false }).limit(200); if (error) throw error; return (data ?? []) as AuditEvent[] }
