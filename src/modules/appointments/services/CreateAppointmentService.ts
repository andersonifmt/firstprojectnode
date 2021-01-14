import {startOfDay} from 'date-fns';

import AppError from '@shared/erros/AppError';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


interface IRequest{
  provider_id: string;
  date: Date;
}

class CreateAppointmentServices{
  constructor(private AppointmentsRepository: IAppointmentsRepository){}

  public async execute({date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfDay(date);

      const findAppointmentInSameDate = await this.AppointmentsRepository.findByDate(
        appointmentDate,
      );

      if(findAppointmentInSameDate){
        throw new AppError('This appointment is already booked');
      }

      const appointment = await this.AppointmentsRepository.create({
        provider_id,
        date: appointmentDate,
      });
    
      return appointment;
    }
}

export default CreateAppointmentServices;