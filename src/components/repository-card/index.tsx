import { memo } from 'react';
import { Card, EllipsisText } from '@vkontakte/vkui';
import { Icon16StarAlt } from '@vkontakte/icons';

import { EditButton } from './edit';
import { DeleteButton } from './delete';

import styles from './repository-card.module.css';

export type RepositoryCardProps = {
  id: number;
  html_url: string;
  description: string | null;
  full_name: string;
  name: string;
  owner: {
    html_url: string;
    avatar_url: string;
  };
  stargazers_count: number;
  updated_at: string;
  language: string | null;
};

export const RepositoryCard = memo((props: RepositoryCardProps) => {
  return (
    <Card mode='outline'>
      <div className={styles.card}>
        <div className={styles.cardInfo}>
          <div className={styles.repoInfo}>
            <div className={styles.avatarContainer}>
              <img src={props.owner.avatar_url} alt='avatar' />
            </div>
            <a href={props.html_url} target='_blank' rel='noreferrer'>
              {props.full_name}
            </a>
          </div>
          <span className={styles.description}>
            <EllipsisText maxLines={1}>{props.description}</EllipsisText>
          </span>
          <div className={styles.repoSecondaryInfo}>
            <span>{props.language}</span>
            <span className={styles.stars}>
              <Icon16StarAlt /> {props.stargazers_count}
            </span>
            <span>Обновлено: {new Date(props.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
        <div className={styles.cardActions}>
          <EditButton {...props} />
          <DeleteButton id={props.id} />
        </div>
      </div>
    </Card>
  );
});
