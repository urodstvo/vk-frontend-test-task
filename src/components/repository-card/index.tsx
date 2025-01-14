import { Card } from "@vkontakte/vkui";
import { memo } from "react";

import styles from "./repository-card.module.css";
import { Icon16StarAlt } from "@vkontakte/icons";

type RepositoryCardProps = {
  html_url: string;
  description: string | null;
  full_name: string;
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
    <Card mode="outline" className={styles.card}>
      <div className={styles.repoInfo}>
        <div className={styles.avatarContainer}>
          <img src={props.owner.avatar_url} alt="avatar" />
        </div>
        <a href={props.html_url} target="_blank" rel="noreferrer">
          {props.full_name}
        </a>
      </div>
      <p className={styles.description}>{props.description}</p>
      <div className={styles.repoSecondaryInfo}>
        <span>{props.language}</span>
        <span className={styles.stars}>
          <Icon16StarAlt /> {props.stargazers_count}
        </span>
        <span>Обновлено: {new Date(props.updated_at).toLocaleDateString()}</span>
      </div>
    </Card>
  );
});
