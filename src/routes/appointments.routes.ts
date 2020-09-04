import { Router, request, response} from 'express';
import {startOfDay, parseISO} from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response)=>{
  const { provider, date } = request.body;

  const parsedDate = startOfDay(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(
    parsedDate,
  );

  if(findAppointmentInSameDate){
    return response
      .status(400)
      .json({message: 'This appointment is already booked'});
  }


  const appointment = appointmentRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;