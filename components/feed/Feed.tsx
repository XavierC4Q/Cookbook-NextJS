import getTestIDs from '../../utils/getTestId';

export const testIds = getTestIDs();

function Feed() {
  return <div data-testid={testIds.feedPage}>Feed</div>;
}

export default Feed;
