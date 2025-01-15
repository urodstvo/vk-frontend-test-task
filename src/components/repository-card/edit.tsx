import { Icon16PenOutline } from '@vkontakte/icons';
import {
  Button,
  ButtonGroup,
  FormItem,
  FormLayoutGroup,
  IconButton,
  Input,
  ModalCard,
  Textarea,
} from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';

import { resultListStore } from '@/store/list';
import { useCallback, useState } from 'react';
import { RepositoryCardProps } from '.';

import styles from './repository-card.module.css';
import { Controller, useForm } from 'react-hook-form';

export const EditButton = observer((props: RepositoryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: props.name,
      description: props.description || '',
      language: props.language || '',
      stargazers_count: props.stargazers_count || 0,
    },
  });

  const handleSubmit = useCallback(
    (data: { name: string; description: string; language: string; stargazers_count: number }) => {
      resultListStore.edit({
        ...props,
        ...data,
        full_name: props.full_name.split('/')[0] + '/' + data.name,
        updated_at: new Date().toISOString(),
      });
      setIsModalOpen(false);
    },
    [props],
  );

  return (
    <>
      <IconButton title='Редактировать' onClick={() => setIsModalOpen(true)}>
        <Icon16PenOutline />
      </IconButton>
      <ModalCard
        keepMounted={false}
        open={isModalOpen}
        id={`modal-${props.id}`}
        title='Редактирование данных репозитория'
        dismissButtonMode='none'
      >
        <form className={styles.modalForm} onSubmit={form.handleSubmit(handleSubmit)}>
          <FormLayoutGroup mode='vertical'>
            <Controller
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem top='Название репозитория' htmlFor='form-name'>
                  <Input
                    id='form-name'
                    placeholder='Название репозитория'
                    disabled={field.disabled}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    getRef={field.ref}
                  />
                </FormItem>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem top='Описание' htmlFor='form-description'>
                  <Textarea
                    disabled={field.disabled}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    id='form-description'
                    placeholder='Описание'
                    getRef={field.ref}
                  />
                </FormItem>
              )}
            />
            <Controller
              name='language'
              control={form.control}
              render={({ field }) => (
                <FormItem htmlFor='form-language' top='Язык программирования репозитория'>
                  <Input
                    disabled={field.disabled}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    id='form-language'
                    placeholder='Язык программирования репозитория'
                    getRef={field.ref}
                  />
                </FormItem>
              )}
            />
            <Controller
              name='stargazers_count'
              control={form.control}
              render={({ field }) => (
                <FormItem htmlFor='form-stars' top='Количество звезд'>
                  <Input
                    disabled={field.disabled}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    type='number'
                    id='form-stars'
                    placeholder='Количество звезд'
                    getRef={field.ref}
                  />
                </FormItem>
              )}
            />
          </FormLayoutGroup>
          <ButtonGroup mode='horizontal' gap='m' align='right' style={{ marginTop: 16 }}>
            <Button type='submit'>Сохранить</Button>
            <Button type='button' mode='secondary' onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
          </ButtonGroup>
        </form>
      </ModalCard>
    </>
  );
});
