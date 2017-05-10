import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './HotTopicList.less';

class HotTopicList extends React.Component {

  componentDidMount() {
    this.props.dispatch({ type: 'topic/fetchHot' });
  }

  render() {
    const { list } = this.props;

    return (
      <div className={styles.group}>
        <h5 className={styles.title}>热门话题</h5>
        <ul>
          { list.map(item => <li key={item.id}><Link to={`/topic/${item.id}`}>{item.title}</Link></li>) }
        </ul>
      </div>
    );
  }
}

HotTopicList.propTypes = {
};

function mapStateToProps(state) {
  return {
    list: state.topic.hot,
  };
}

export default connect(mapStateToProps)(HotTopicList);
