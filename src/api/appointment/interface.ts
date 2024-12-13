export interface IAppointmentRequest {
  time: string;
  customerId: number;
  employeeId?: number;
  serviceId: number;
  note: string;
  branchId: number;
}
