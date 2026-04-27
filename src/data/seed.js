import { addDays, format } from 'date-fns';

const today = new Date();

export const demoUsers = [
  { email: 'admin@company.com', password: '123456', role: 'Admin', name: 'System Admin', resourceId: 'r1' },
  { email: 'lead@company.com', password: '123456', role: 'Lead', name: 'Sachin Saxena', resourceId: 'r1' },
  { email: 'user@company.com', password: '123456', role: 'User', name: 'Ashfaq Patel', resourceId: 'r2' },
];

export const seedData = {
  resources: [
    ['r1','Sachin Saxena','Track Lead','Client Services'],['r2','Ashfaq Patel','Consultant','Engineering Monitoring'],
    ['r3','Akhil Kumar Reddy','Developer','Engineering Monitoring'],['r4','Devvarshini','QA Engineer','Shared'],
    ['r5','Naga Soundarya','Business Analyst','Client Services'],['r6','Sneha','Developer','Engineering Monitoring'],
    ['r7','Sunil Kumar','Architect','Shared'],['r8','Georgian Martin','Developer','Client Services'],
    ['r9','Karthik','DevOps Engineer','Shared'],['r10','Akhila','QA Engineer','Engineering Monitoring'],
    ['r11','Sharad','Developer','Client Services'],['r12','Shreyas','Support Engineer','Shared'],
    ['r13','Sohila','Project Coordinator','Client Services'],['r14','Trinad','Developer','Engineering Monitoring'],
    ['r15','Ullas Patil','Integration Specialist','Shared'],
  ].map((r, i) => ({ id: r[0], name: r[1], role: r[2], group: r[3], email: `${r[1].toLowerCase().replace(/\s+/g, '.')}@company.com`, capacityHours: 8, skills: ['Java', 'API', 'Support', 'Testing'].slice(0, (i % 4) + 1), status: i % 5 === 0 ? 'On Leave' : 'Active' })),
  projects: [
    'WebMethod Modernization','ITA Modernization','Exxon Mobile Testing','Dynamic Pricing','TMap EDI','TMap DART','USSHEET HRMS Replacement','SAP T25'
  ].map((name, i) => ({
    id: `p${i + 1}`,
    name,
    type: ['Project', 'Enhancement', 'Feature'][i % 3],
    status: ['In Progress', 'Not Started', 'Completed'][i % 3],
    priority: ['High', 'Medium', 'Critical', 'Low'][i % 4],
    startDate: format(addDays(today, -30 + i * 2), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 30 + i * 4), 'yyyy-MM-dd'),
    progress: Math.min(100, 20 + i * 10),
    budget: 50000 + i * 12000,
    owner: `r${(i % 7) + 1}`,
    allocatedResources: [`r${(i % 10) + 1}`, `r${((i + 3) % 12) + 1}`],
    health: ['Good', 'At Risk', 'Critical'][i % 3],
    description: `${name} delivery stream focused on integration and optimization milestones.`,
  })),
  tasks: Array.from({ length: 24 }).map((_, i) => ({
    id: `t${i + 1}`,
    workItem: `WI-${1000 + i}`,
    description: `Task ${i + 1} execution for sprint deliverable`,
    category: ['Development','Testing','Requirement Gathering','Deployment','Code Review','Maintenance','AMS Support','Outage','Meeting','Documentation'][i % 10],
    status: ['Open', 'In Progress', 'Completed', 'Blocked'][i % 4],
    assignedTo: `r${(i % 15) + 1}`,
    projectId: `p${(i % 8) + 1}`,
    hours: 2 + (i % 8),
    startDate: format(addDays(today, -(i % 12)), 'yyyy-MM-dd'),
    dueDate: format(addDays(today, 5 + (i % 10)), 'yyyy-MM-dd'),
    endDate: i % 3 === 0 ? format(addDays(today, -(i % 5)), 'yyyy-MM-dd') : '',
    billable: i % 3 !== 0,
    notes: 'Tracked via daily scrum updates.',
  })),
  leaves: Array.from({ length: 10 }).map((_, i) => ({
    id: `l${i + 1}`,
    resourceId: `r${(i % 15) + 1}`,
    leaveType: ['Casual', 'Sick', 'Planned'][i % 3],
    startDate: format(addDays(today, i - 2), 'yyyy-MM-dd'),
    endDate: format(addDays(today, i), 'yyyy-MM-dd'),
    days: 1 + (i % 3),
    status: i % 4 === 0 ? 'Approved' : 'Pending',
    reason: 'Personal commitment',
  })),
  risks: Array.from({ length: 9 }).map((_, i) => ({
    id: `rk${i + 1}`,
    projectId: `p${(i % 8) + 1}`,
    title: `Risk ${i + 1} - Dependency delay`,
    description: 'Potential delay from external dependency and environment readiness.',
    severity: ['Low', 'Medium', 'High', 'Critical'][i % 4],
    impact: ['Low', 'Medium', 'High'][i % 3],
    owner: `r${(i % 15) + 1}`,
    mitigationPlan: 'Escalate weekly and prepare fallback execution path.',
    status: ['Open', 'Mitigated', 'Closed'][i % 3],
  })),
  dependencies: Array.from({ length: 12 }).map((_, i) => ({
    id: `d${i + 1}`,
    projectId: `p${(i % 8) + 1}`,
    taskId: `t${(i % 24) + 1}`,
    dependsOnTaskId: `t${((i + 4) % 24) + 1}`,
    type: ['Blocking', 'External', 'Internal'][i % 3],
    status: ['Open', 'Resolved', 'Blocked'][i % 3],
  })),
  notifications: [
    { id: 'n1', text: '2 critical risks need attention.', level: 'risk' },
    { id: 'n2', text: 'Leave approval pending for 4 requests.', level: 'info' },
  ],
};
