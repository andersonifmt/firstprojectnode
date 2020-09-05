import { Router, request, response} from 'express';
import {startOfDay, parseISO} from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response)=>{
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response)=>{
  const { provider, date } = request.body;

  const parsedDate = startOfDay(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if(findAppointmentInSameDate){
    return response
      .status(400)
      .json({message: 'This appointment is already booked'});
  }


  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate
  });

  return response.json(appointment);
});

export default appointmentsRouter;