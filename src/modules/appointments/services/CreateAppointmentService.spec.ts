import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentServices from './CreateAppointmentService';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment.', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const CreateAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '12323',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12323');
  });

  // it('Should not be able to create two appointments on the same time.', () => {
  //   expect(1+2).toBe(3);
  // });
});