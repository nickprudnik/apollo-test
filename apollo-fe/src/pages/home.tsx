import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormTypes = {
  directory: string;
  directoryName: string;
};

export const Home = () => {
  const { register, handleSubmit } = useForm<FormTypes>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    navigate(
      `listing/?directoryName=${data.directoryName}&directory=${data.directory}`
    );
  };

  return (
    <div className="container">
      <h2>
        Before we start, please choose directory and enter the name of directory
        where to find repos
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="d-flex-column">
          Directory type:
          <select
            className="form-select"
            {...register('directory', { required: true })}
          >
            <option value="org">Organisation</option>
            <option value="user">User</option>
          </select>
        </label>
        <label className="d-flex-column">
          Directory name (organisation or user name):
          <input
            className="form-input"
            {...register('directoryName', { required: true })}
          />
        </label>
        <input className="primary-button" type="submit" />
      </form>
    </div>
  );
};
