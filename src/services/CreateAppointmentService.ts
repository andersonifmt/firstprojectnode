import Appointment from '../models/Appointments';
import {startOfDay} from 'date-fns';
import appointmentsRepository from '../repositories/AppointmentsRepository';

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentServices{
  private appointmentsRepository: appointmentsRepository;

    constructor(appointmentsRepository: appointmentsRepository){
      this.appointmentsRepository = appointmentsRepository;
    }

    public execute({provider, date}: Request): Appointment{
      const appointmentDate = startOfDay(date);

      const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
        appointmentDate,
      );

      if(findAppointmentInSameDate){
        throw Error ('This appointment is already booked');
      }

      const appointment = this.appointmentsRepository.create({
        provider,
        date: appointmentDate
      });
    
      return appointment;
    }
}

export default CreateAppointmentServices;