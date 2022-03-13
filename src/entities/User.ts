import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	OneToMany
} from "typeorm";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Shortcut } from "./Shortcut";

@ObjectType()
@Entity()
export class User {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column({ length: "32" })
	firstName: string;

	@Field({ nullable: true })
	@Column({ length: "32", nullable: true })
	lastName?: string;

	@Field()
	@Column({ length: "32", unique: true })
	email: string;

	@Column()
	password: string;

	@Field()
	@CreateDateColumn()
	createdAt: Date;

	// only expose accessToken to GraphQL type
	// and not store in db
	@Field({ nullable: true })
	accessToken?: string;

	@Field(() => Shortcut)
	@OneToMany(() => Shortcut, (shortcut) => shortcut.user)
	shortcuts: Shortcut[];
}

@InputType()
export class UserRegInput implements Partial<User> {
	@Field()
	firstName: string;

	@Field({ nullable: true })
	lastName?: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class UserLoginInput implements Partial<User> {
	@Field()
	email: string;

	@Field()
	password: string;
}
