import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProfileSettings({ user }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: user?.email,
    }
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Birth Date</label>
          <input type="date" {...register("birthDate", { required: "Birth date is required" })} />
          {errors.birthDate && <p>{errors.birthDate.message}</p>}
        </div>

        <div>
          <label>Language</label>
          <select {...register("language", { required: "Language is required" })}>
            <option value="">Select...</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            // Add more options as needed
          </select>
          {errors.language && <p>{errors.language.message}</p>}
        </div>

        <div>
          <label>Biography</label>
          <textarea {...register("biography")} />
        </div>

        <input type="submit" />
      </form>
      <Footer />
    </>
  );
}
