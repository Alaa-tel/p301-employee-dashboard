import type { Case, Task, Touchpoint, Alert, QueueMetric, DailyMetric } from '../types'

export const mockCases: Case[] = [
  {
    id: 'CASE-001',
    clientName: 'Margaret Chen Family Fund',
    status: 'active',
    priority: 'high',
    slaDate: '2026-05-12',
    slaAtRisk: true,
    lastTouchpoint: '2026-05-11 09:30 AM',
    assignedTo: 'Sarah Martinez',
    nextAction: 'Call client regarding distribution request'
  },
  {
    id: 'CASE-002',
    clientName: 'Johnson Community Foundation',
    status: 'active',
    priority: 'high',
    slaDate: '2026-05-13',
    slaAtRisk: false,
    lastTouchpoint: '2026-05-11 08:15 AM',
    assignedTo: 'Michael Torres',
    nextAction: 'Review and approve grant recommendation'
  },
  {
    id: 'CASE-003',
    clientName: 'Westbrook Charitable Trust',
    status: 'active',
    priority: 'medium',
    slaDate: '2026-05-14',
    slaAtRisk: false,
    lastTouchpoint: '2026-05-10 02:45 PM',
    assignedTo: 'Jennifer Kim',
    nextAction: 'Prepare year-end tax documentation'
  },
  {
    id: 'CASE-004',
    clientName: 'Patterson Legacy Fund',
    status: 'active',
    priority: 'medium',
    slaDate: '2026-05-15',
    slaAtRisk: false,
    lastTouchpoint: '2026-05-11 11:00 AM',
    assignedTo: 'David Chen',
    nextAction: 'Send quarterly performance report'
  },
  {
    id: 'CASE-005',
    clientName: 'Anderson Advisory Fund',
    status: 'pending',
    priority: 'low',
    slaDate: '2026-05-20',
    slaAtRisk: false,
    lastTouchpoint: '2026-05-09 03:20 PM',
    assignedTo: 'Sarah Martinez',
    nextAction: 'Awaiting client documentation'
  },
  {
    id: 'CASE-006',
    clientName: 'Rivera Education Fund',
    status: 'active',
    priority: 'high',
    slaDate: '2026-05-13',
    slaAtRisk: true,
    lastTouchpoint: '2026-05-08 10:00 AM',
    assignedTo: 'Maria Garcia',
    nextAction: 'Urgent: Contact client regarding investment allocation'
  }
]

export const mockTasks: Task[] = [
  {
    id: 'TASK-001',
    caseId: 'CASE-001',
    description: 'Call Margaret Chen regarding charitable distribution',
    dueDate: '2026-05-11',
    completed: false,
    priority: 'high'
  },
  {
    id: 'TASK-002',
    caseId: 'CASE-003',
    description: 'Prepare 2025 tax summary documents',
    dueDate: '2026-05-11',
    completed: false,
    priority: 'high'
  },
  {
    id: 'TASK-003',
    caseId: 'CASE-004',
    description: 'Review investment performance vs benchmark',
    dueDate: '2026-05-12',
    completed: false,
    priority: 'medium'
  },
  {
    id: 'TASK-004',
    caseId: 'CASE-002',
    description: 'Send grant recommendation approval to portfolio manager',
    dueDate: '2026-05-12',
    completed: false,
    priority: 'medium'
  },
  {
    id: 'TASK-005',
    caseId: 'CASE-005',
    description: 'Follow up with client on missing K-1 forms',
    dueDate: '2026-05-13',
    completed: false,
    priority: 'medium'
  }
]

export const mockTouchpoints: Touchpoint[] = [
  {
    id: 'TP-001',
    caseId: 'CASE-001',
    clientName: 'Margaret Chen Family Fund',
    type: 'call',
    description: 'Discussed immediate distribution needs and timeline',
    timestamp: '2026-05-11 09:30 AM'
  },
  {
    id: 'TP-002',
    caseId: 'CASE-004',
    clientName: 'Patterson Legacy Fund',
    type: 'email',
    description: 'Sent quarterly performance report and market analysis',
    timestamp: '2026-05-11 11:00 AM'
  },
  {
    id: 'TP-003',
    caseId: 'CASE-002',
    clientName: 'Johnson Community Foundation',
    type: 'meeting',
    description: 'Virtual meeting to review 2026 grant strategy',
    timestamp: '2026-05-11 08:15 AM'
  },
  {
    id: 'TP-004',
    caseId: 'CASE-006',
    clientName: 'Rivera Education Fund',
    type: 'note',
    description: 'Client requested urgent meeting regarding portfolio rebalancing',
    timestamp: '2026-05-10 04:30 PM'
  },
  {
    id: 'TP-005',
    caseId: 'CASE-003',
    clientName: 'Westbrook Charitable Trust',
    type: 'email',
    description: 'Sent year-end tax planning recommendations',
    timestamp: '2026-05-10 02:45 PM'
  }
]

export const mockAlerts: Alert[] = [
  {
    id: 'ALERT-001',
    caseId: 'CASE-001',
    clientName: 'Margaret Chen Family Fund',
    type: 'sla_risk',
    severity: 'critical',
    message: 'SLA expires in 4 hours - immediate follow-up required',
    timestamp: '2026-05-11 12:00 PM'
  },
  {
    id: 'ALERT-002',
    caseId: 'CASE-006',
    clientName: 'Rivera Education Fund',
    type: 'sla_risk',
    severity: 'warning',
    message: 'SLA at risk - last contact was 3 days ago',
    timestamp: '2026-05-11 11:30 AM'
  },
  {
    id: 'ALERT-003',
    caseId: 'CASE-002',
    clientName: 'Johnson Community Foundation',
    type: 'follow_up',
    severity: 'info',
    message: 'Scheduled follow-up meeting for grant review',
    timestamp: '2026-05-11 10:00 AM'
  }
]

export const mockQueueMetrics: QueueMetric[] = [
  { name: 'Distribution Requests', count: 12, avgWait: 8 },
  { name: 'Tax Planning', count: 5, avgWait: 15 },
  { name: 'Investment Review', count: 8, avgWait: 12 },
  { name: 'Account Maintenance', count: 3, avgWait: 5 }
]

export const mockDailyMetrics: DailyMetric[] = [
  { hour: '8 AM', resolved: 2, escalated: 0, created: 3 },
  { hour: '9 AM', resolved: 3, escalated: 1, created: 2 },
  { hour: '10 AM', resolved: 1, escalated: 0, created: 4 },
  { hour: '11 AM', resolved: 2, escalated: 2, created: 1 },
  { hour: '12 PM', resolved: 0, escalated: 0, created: 2 },
  { hour: '1 PM', resolved: 4, escalated: 1, created: 3 }
]

export function getActiveCaseCount(): number {
  return mockCases.filter(c => c.status === 'active').length
}

export function getSLARiskCount(): number {
  return mockCases.filter(c => c.slaAtRisk).length
}

export function getFollowUpDueCount(): number {
  return mockTasks.filter(t => t.dueDate === '2026-05-11' && !t.completed).length
}

export function getAverageQueueWait(): number {
  const total = mockQueueMetrics.reduce((sum, q) => sum + q.avgWait, 0)
  return Math.round(total / mockQueueMetrics.length)
}
