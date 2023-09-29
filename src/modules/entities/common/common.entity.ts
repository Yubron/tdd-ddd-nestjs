import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public readonly createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public readonly updatedAt: Date;
}
