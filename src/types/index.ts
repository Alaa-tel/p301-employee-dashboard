export interface Case {
  id: string
  clientName: string
  status: 'active' | 'pending' | 'resolved'
  priority: 'high' | 'medium' | 'low'
  slaDate: string
  slaAtRisk: boolean
  lastTouchpoint: string
  assignedTo: string
  nextAction: string
}

export interface Task {
  id: string
  caseId: string
  description: string
  dueDate: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

export interface Touchpoint {
  id: string
  caseId: string
  clientName: string
  type: 'call' | 'email' | 'meeting' | 'note'
  description: string
  timestamp: string
}

export interface Alert {
  id: string
  caseId: string
  clientName: string
  type: 'sla_risk' | 'escalation' | 'follow_up'
  severity: 'critical' | 'warning' | 'info'
  message: string
  timestamp: string
}

export interface QueueMetric {
  name: string
  count: number
  avgWait: number // in minutes
}

export interface DailyMetric {
  hour: string
  resolved: number
  escalated: number
  created: number
}
