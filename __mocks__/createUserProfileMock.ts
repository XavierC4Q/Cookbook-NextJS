import { createMocks } from 'node-mocks-http';

const userProfileMock = createMocks({
    method: 'POST',
    body: {}
});

export default userProfileMock;