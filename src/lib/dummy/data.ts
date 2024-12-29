import { Member, Trainer } from '@/types';

// Sample data
export const initialData: Member[] = [
  {
    id: '1',
    gymNo: '#00001',
    name: 'Arnold Schwarzneger',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'partially_paid',
    email: 'schwarznager@gmail.com',
    phone: '+91 123 456 7890',
    bloodGroup: 'O+',
    gender: 'Male',
    dob: '1947-07-30',
    doj: '2021-01-15',
  },
  {
    id: '2',
    gymNo: '#00002',
    name: 'Amit Choudhury',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'paid',
    email: 'amit.choudhury@example.com',
    phone: '+91 987 654 3210',
    bloodGroup: 'A-',
    gender: 'Male',
    dob: '1985-09-12',
    doj: '2022-02-01',
  },
  {
    id: '3',
    gymNo: '#00003',
    name: 'Sneha Reddy',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Quarterly',
    feeStatus: 'partially_paid',
    email: 'sneha.reddy@example.com',
    phone: '+91 456 789 0123',
    bloodGroup: 'B+',
    gender: 'Female',
    dob: '1992-05-18',
    doj: '2023-05-10',
  },
  {
    id: '4',
    gymNo: '#00004',
    name: 'Arjun Mehta',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'paid',
    email: 'arjun.mehta@example.com',
    phone: '+91 789 012 3456',
    bloodGroup: 'O-',
    gender: 'Male',
    dob: '1990-11-25',
    doj: '2021-08-20',
  },
  {
    id: '5',
    gymNo: '#00005',
    name: 'Karan Verma',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'unpaid',
    email: 'karan.verma@example.com',
    phone: '+91 234 567 8901',
    bloodGroup: 'A+',
    gender: 'Male',
    dob: '1988-02-14',
    doj: '2020-12-15',
  },
  {
    id: '6',
    gymNo: '#00006',
    name: 'Priya Sharma',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Half_Yearly',
    feeStatus: 'paid',
    email: 'priya.sharma@example.com',
    phone: '+91 678 901 2345',
    bloodGroup: 'AB+',
    gender: 'Female',
    dob: '1995-03-30',
    doj: '2023-03-01',
  },
  {
    id: '7',
    gymNo: '#00007',
    name: 'John Doe',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'unpaid',
    email: 'john.doe@example.com',
    phone: '+91 345 678 9012',
    bloodGroup: 'B-',
    gender: 'Male',
    dob: '1993-07-10',
    doj: '2021-09-12',
  },
  {
    id: '8',
    gymNo: '#00008',
    name: 'Sophia Williams',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'partially_paid',
    email: 'sophia.williams@example.com',
    phone: '+91 890 123 4567',
    bloodGroup: 'O+',
    gender: 'Female',
    dob: '1991-04-22',
    doj: '2022-06-15',
  },
  {
    id: '9',
    gymNo: '#00009',
    name: 'Ankit Yadav',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Quarterly',
    feeStatus: 'paid',
    email: 'ankit.yadav@example.com',
    phone: '+91 210 987 6543',
    bloodGroup: 'A+',
    gender: 'Male',
    dob: '1987-08-03',
    doj: '2021-11-30',
  },
  {
    id: '10',
    gymNo: '#00010',
    name: 'Emma Taylor',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Half_Yearly',
    feeStatus: 'unpaid',
    email: 'emma.taylor@example.com',
    phone: '+91 123 789 4560',
    bloodGroup: 'O-',
    gender: 'Female',
    dob: '1996-12-05',
    doj: '2023-01-20',
  },
  {
    id: '11',
    gymNo: '#00011',
    name: 'David Johnson',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'paid',
    email: 'david.johnson@example.com',
    phone: '+91 789 654 1230',
    bloodGroup: 'A-',
    gender: 'Male',
    dob: '1991-10-15',
    doj: '2023-06-15',
  },
  {
    id: '12',
    gymNo: '#00012',
    name: 'Olivia Brown',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'partially_paid',
    email: 'olivia.brown@example.com',
    phone: '+91 234 890 5678',
    bloodGroup: 'AB-',
    gender: 'Female',
    dob: '1992-08-23',
    doj: '2022-09-30',
  },
  {
    id: '13',
    gymNo: '#00013',
    name: 'Nikhil Sharma',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Special',
    feeStatus: 'paid',
    email: 'nikhil.sharma@example.com',
    phone: '+91 654 321 8901',
    bloodGroup: 'B+',
    gender: 'Male',
    dob: '1989-01-01',
    doj: '2023-07-11',
  },
  {
    id: '14',
    gymNo: '#00014',
    name: 'Isabella Garcia',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Half_Yearly',
    feeStatus: 'unpaid',
    email: 'isabella.garcia@example.com',
    phone: '+91 123 432 5678',
    bloodGroup: 'O+',
    gender: 'Female',
    dob: '1994-06-20',
    doj: '2022-08-14',
  },
  {
    id: '15',
    gymNo: '#00015',
    name: 'Ethan Anderson',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Quarterly',
    feeStatus: 'unpaid',
    email: 'ethan.anderson@example.com',
    phone: '+91 567 890 1234',
    bloodGroup: 'B-',
    gender: 'Male',
    dob: '1986-11-30',
    doj: '2020-10-22',
  },
  {
    id: '16',
    gymNo: '#00016',
    name: 'Mia Martinez',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Monthly',
    feeStatus: 'paid',
    email: 'mia.martinez@example.com',
    phone: '+91 890 345 6789',
    bloodGroup: 'AB+',
    gender: 'Female',
    dob: '1993-03-12',
    doj: '2021-07-20',
  },
  {
    id: '17',
    gymNo: '#00017',
    name: 'Liam Wilson',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Yearly',
    feeStatus: 'partially_paid',
    email: 'liam.wilson@example.com',
    phone: '+91 432 567 8901',
    bloodGroup: 'A+',
    gender: 'Male',
    dob: '1990-04-14',
    doj: '2023-01-10',
  },
  {
    id: '18',
    gymNo: '#00018',
    name: 'Ella Rodriguez',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Special',
    feeStatus: 'paid',
    email: 'ella.rodriguez@example.com',
    phone: '+91 234 789 5678',
    bloodGroup: 'B+',
    gender: 'Female',
    dob: '1995-12-10',
    doj: '2022-03-30',
  },
  {
    id: '19',
    gymNo: '#00019',
    name: 'Noah Clark',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Quarterly',
    feeStatus: 'unpaid',
    email: 'noah.clark@example.com',
    phone: '+91 321 890 4567',
    bloodGroup: 'O-',
    gender: 'Male',
    dob: '1984-05-25',
    doj: '2020-11-05',
  },
  {
    id: '20',
    gymNo: '#00020',
    name: 'Sophia Lewis',
    avatar: '/placeholder.svg?height=32&width=32',
    package: 'Half_Yearly',
    feeStatus: 'partially_paid',
    email: 'sophia.lewis@example.com',
    phone: '+91 678 901 2345',
    bloodGroup: 'AB-',
    gender: 'Female',
    dob: '1997-07-18',
    doj: '2023-02-10',
  },
];

export const initialTrainers: Trainer[] = [
  {
    id: '1',
    trainerId: '#00001',
    name: 'Tony Stank',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Admin',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '2',
    trainerId: '#00002',
    name: 'Arjun Menon',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Regular_User',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '3',
    trainerId: '#00003',
    name: 'Vikram Nair',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '4',
    trainerId: '#00004',
    name: 'Suresh Pillai',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '5',
    trainerId: '#00005',
    name: 'Ravi Kumar',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '6',
    trainerId: '#00006',
    name: 'Ajith Rajan',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '7',
    trainerId: '#00007',
    name: 'Deepak Varma',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '8',
    trainerId: '#00008',
    name: 'Nikhil Thomas',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '9',
    trainerId: '#00009',
    name: 'Sanjay Menon',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
  {
    id: '10',
    trainerId: '#00010',
    name: 'Vishnu Iyer',
    avatar: '/placeholder.svg?height=32&width=32',
    designation: 'Trainer',
    email: 'irumbman@gmail.com',
    phone: '+91 8138 964 895',
  },
];
