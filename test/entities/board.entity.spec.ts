import { Board } from 'src/modules/entities/board.entity';
import { User } from 'src/modules/entities/user.entity';

describe('Entity: Board', () => {
  it('should be defined', async () => {
    const testUser = await User.of({
      email: 'test',
      nickname: 'test',
      password: 'test',
      appVersion: 'test',
    });

    const testBoardObject = {
      title: 'test',
      content: 'test',
      writer: testUser,
    };

    const board = Board.of(testBoardObject);
    expect(board).toBeDefined();
    expect(board).toBeInstanceOf(Board);
    expect(board.title).toBe(testBoardObject.title);
    expect(board.content).toBe(testBoardObject.content);
  });
});
