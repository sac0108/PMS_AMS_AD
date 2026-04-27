import { differenceInCalendarDays, isWithinInterval, parseISO } from 'date-fns';

export const computeResourceRows = (data) => data.resources.map((r) => {
  const tasks = data.tasks.filter((t) => t.assignedTo === r.id);
  const amsHours = tasks.filter((t) => ['AMS Support', 'Maintenance', 'Outage'].includes(t.category)).reduce((a, b) => a + Number(b.hours), 0) % 8;
  const projectHours = tasks.filter((t) => !['AMS Support', 'Maintenance', 'Outage'].includes(t.category)).reduce((a, b) => a + Number(b.hours), 0) % 8;
  const leaveHours = data.leaves.filter((l) => l.resourceId === r.id && l.status === 'Approved').reduce((a, b) => a + b.days * 8, 0) / 5;
  const availableHours = Math.max(0, 8 - amsHours - projectHours - leaveHours);
  const utilization = Math.min(100, Math.round(((amsHours + projectHours + leaveHours) / 8) * 100));
  return { ...r, amsHours, projectHours, leaveHours: Number(leaveHours.toFixed(1)), availableHours: Number(availableHours.toFixed(1)), utilization, status: utilization > 100 ? 'Overutilized' : utilization > 85 ? 'Busy' : 'Available' };
});

export const avgCompletion = (tasks) => {
  const done = tasks.filter((t) => t.endDate);
  if (!done.length) return 0;
  return Math.round(done.reduce((a, t) => a + Math.abs(differenceInCalendarDays(parseISO(t.endDate), parseISO(t.startDate))), 0) / done.length);
};

export const onLeaveToday = (data, date = new Date()) => data.leaves.filter((l) => l.status === 'Approved' && isWithinInterval(date, { start: parseISO(l.startDate), end: parseISO(l.endDate) }));
