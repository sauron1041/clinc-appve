export interface IAppointment {
  date: Date;
  time: Date;
  customerId: number;
  employeeId?: number;
  serviceId: number;
  note: string;
  branchId: number;
}
