import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const employeeSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(20, 'Имя слишком длинное'),
  salary: z
    .number({ invalid_type_error: 'Введите число' })
    .min(100, 'Зарплата должна быть не менее 100$')
    .max(100000, 'Слишком большая зарплата'),
});

function AddEmployeeForm({ onAddEmployee }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      salary: '',
    },
  });

  const onSubmit = (data) => {
    onAddEmployee(data.name, data.salary);
    reset();
  };

  return (
    <div className="add-card">
      <h3>Добавьте нового сотрудника</h3>
      
      {/* Добавил стили прямо сюда, чтобы поля не слипались */}
      <form 
        className="add-form" 
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <input
            type="text"
            placeholder="Как его зовут?"
            {...register('name')}
          />
          {errors.name && (
            <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <input
            type="number"
            placeholder="ЗП в $"
            {...register('salary', { valueAsNumber: true })}
          />
          {errors.salary && (
            <span style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
              {errors.salary.message}
            </span>
          )}
        </div>

        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}

export default AddEmployeeForm;