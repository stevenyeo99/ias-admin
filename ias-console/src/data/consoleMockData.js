import {
  Bot,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Monitor,
  Search,
  ShieldCheck
} from 'lucide-react';

export const jobDetails = {
  policyNumber: '',
  memberNumber: '',
  dateOfBirth: '',
  agentCode: ''
};

export const activityLogs = [
  { time: '09:41:12', message: 'Job created successfully', state: 'done' },
  { time: '09:41:14', message: 'Opening browser', state: 'done' },
  { time: '09:41:15', message: 'Navigating to IAS system', state: 'done' },
  { time: '09:41:18', message: 'Entering credentials', state: 'done' },
  {
    time: '09:41:22',
    message: 'Searching for policy:',
    detail: 'AI00012345',
    state: 'active'
  },
  { time: '09:41:25', message: 'Fetching policy details', state: 'pending' },
  { time: '09:41:28', message: 'Extracting member information', state: 'pending' },
  { time: '09:41:30', message: 'Generating CSV', state: 'pending' },
  { time: '09:41:31', message: 'Job in progress...', state: 'pending' }
];

export const extractedData = [
  { label: 'Policy Number', value: 'AI00012345' },
  { label: 'Member Name', value: '-' },
  { label: 'Identity No.', value: '-' },
  { label: 'Date of Birth', value: '-' },
  { label: 'Plan Name', value: '-' },
  { label: 'Status', value: '-' },
  { label: 'Agent Code', value: '-' }
];

export const jobInfoCards = [
  {
    label: 'Job ID',
    value: 'JOB-20240522-094112',
    icon: FileText,
    tone: 'blue'
  },
  {
    label: 'Status',
    value: 'In Progress',
    icon: ShieldCheck,
    tone: 'green',
    badge: true
  },
  {
    label: 'Created At',
    value: '22 May 2024 09:41:12',
    icon: CalendarDays,
    tone: 'blue'
  },
  {
    label: 'Duration',
    value: '00:00:14',
    icon: Clock3,
    tone: 'blue'
  },
  {
    label: 'Browser',
    value: 'Chromium',
    icon: Monitor,
    tone: 'teal'
  }
];

export const viewerState = {
  browserStatus: 'Connected',
  currentStep: 'Searching Policy',
  zoom: '100%',
  autoRefresh: true,
  placeholderIcon: Search
};

export const headerState = {
  title: 'IAS Automation Console',
  subtitle: 'AI-Powered IAS Operation System',
  status: 'Ready',
  notificationCount: 3,
  userInitials: 'AD',
  logoIcon: Bot,
  logoLabel: 'IAS'
};
