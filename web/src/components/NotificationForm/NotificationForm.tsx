import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { NotificationInput } from './types/NotificationInput';
import {
  createNotification,
  getNoticiationCategories,
} from '../../api/Notifications';
import { NotificationCategoriesResponse } from './types/NotificationCategoriesResponse';

function NotificationForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<NotificationInput>();
  const {
    isError: mutationError,
    isSuccess,
    data: notificationData,
    mutate,
  } = useMutation({
    mutationFn: createNotification,
  });
  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getNoticiationCategories,
  });

  const onSubmit: SubmitHandler<NotificationInput> = ({
    category,
    message,
  }) => {
    mutate({ category, message });
  };

  useEffect(() => {
    if (notificationData && notificationData.id > 0) {
      navigate('/notifications');
    }
  }, [notificationData]);

  if (isLoading) {
    return <span>Loading form...</span>;
  }

  if (isError) {
    return <span>Error loading notification form</span>;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Category</span>
        </div>
        <select className="select select-bordered" {...register('category')}>
          {categories.map(
            ({ id, category }: NotificationCategoriesResponse) => (
              <option key={id} value={id}>
                {category}
              </option>
            ),
          )}
        </select>
      </label>

      <label className="form-control">
        <div className="label">
          <span className="label-text">Message</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Write your message here..."
          {...register('message')}
        ></textarea>
      </label>
      <input type="submit" value="Submit" className="btn btn-neutral" />
    </form>
  );
}

export default NotificationForm;
