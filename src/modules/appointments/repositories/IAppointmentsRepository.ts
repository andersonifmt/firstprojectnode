import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDTO from '../dtos/ICreateApointmentDTO';

export default interface IAppointmentsRepository{
  create(data: ICreateAppointmentDTO): Promise<Appointment>;



  findByDate(date: Date): Promise<Appointment | undefined>;
}