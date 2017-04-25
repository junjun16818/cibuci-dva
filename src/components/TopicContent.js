import React from 'react';
import Spacer from './Spacer';
import styles from './TopicContent.less';

const TopicContent = ({ topic }) => {
  return (
    <Spacer>
      <div className={styles.wrapper}>
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />
      </div>
    </Spacer>
  );
};

TopicContent.propTypes = {
};

export default TopicContent;