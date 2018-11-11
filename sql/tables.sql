create table rant (
  id serial primary key,
  created timestamp not null default now(),
  updated timestamp not null default now(),
  title varchar(255) not null,
  background text not null
);

create table rant_update (
  id serial primary key,
  created timestamp not null default now(),
  updated timestamp not null default now(),
  rant_id integer references rant(id),
  body text not null
);
