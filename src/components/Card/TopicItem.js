import React from 'react';
import { Badge } from 'antd';
import { Link } from 'dva/router';
import styles from './TopicItem.less';
import Avatar from '../Avatar';

const badgeStyle = {
  backgroundColor: '#fff',
  color: '#999',
  boxShadow: '0 0 0 1px #d9d9d9 inset',
};

const TopicItem = ({ topic }) => {
  const { id, author, date, title, statistics } = topic;

  return (
    <div className={styles.normal}>

      <div className={styles.media}>
        <div className={`${styles.left} ${styles.middle}`}>
          <Avatar avatar={author.avatar} size="large" />
        </div>
        <div className={styles.body}>
          <div className={styles.heading}>
            <Link to={`/topic/${id}`}>{title}</Link>
          </div>
          <div className={styles.meta}>
            <Link to="/topic?params=jh">精华</Link>&nbsp;•&nbsp;<Link to={`/user/${author.username}`}>{author.displayname}</Link>
            发表于 {date.published}
          </div>
        </div>
        <div className={`${styles.right} ${styles.middle}`}>
          <Badge count={statistics.comments} className={styles.badge} style={badgeStyle} />
        </div>
      </div>
    </div>
  );
};

TopicItem.propTypes = {
};

export default TopicItem;
