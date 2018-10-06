--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-0ubuntu0.18.04)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: contact; Type: TABLE; Schema: public; Owner: muhammadisa
--

CREATE TABLE public.contact (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    gender character varying(255) NOT NULL,
    status boolean DEFAULT false,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modify_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.contact OWNER TO muhammadisa;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: muhammadisa
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO muhammadisa;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: muhammadisa
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO muhammadisa;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: muhammadisa
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: muhammadisa
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO muhammadisa;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: muhammadisa
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO muhammadisa;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: muhammadisa
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: users; Type: TABLE; Schema: public; Owner: muhammadisa
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email_address character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    status boolean DEFAULT false,
    create_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    modify_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO muhammadisa;

--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: muhammadisa
--

COPY public.contact (id, user_id, name, address, gender, status, create_at, modify_at) FROM stdin;
70d6c8c0-c949-11e8-8a91-c9ff6c54938e	128451d0-c948-11e8-b349-51cd8fbe6c08	RPS	Tangerang Cimone	male	f	2018-10-06 16:23:09.771+07	2018-10-06 16:32:37.8+07
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: muhammadisa
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20181006160123_v1.js	1	2018-10-06 16:05:25.049+07
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: muhammadisa
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: muhammadisa
--

COPY public.users (id, email_address, username, password, status, create_at, modify_at) FROM stdin;
128451d0-c948-11e8-b349-51cd8fbe6c08	hyperspace018@gmail.com	@m_isawk	$2b$10$jtOmwfFMeqHXDI64Lst.iOM/rXgGhhy8a8QRD6P8skv9RabAiZLJ6	f	2018-10-06 16:13:21.837+07	2018-10-06 16:13:21.837+07
1f2b4d80-c948-11e8-b349-51cd8fbe6c08	hyperspace01s8@gmail.com	@m_isawk	$2b$10$0jHn1vCfld2pZ9xDA.SfUeMALZ2vAcjyh3oYqGZZ1AeO/23hdEbo.	f	2018-10-06 16:13:43.158+07	2018-10-06 16:13:43.158+07
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: muhammadisa
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 1, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: muhammadisa
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_address_username_unique; Type: CONSTRAINT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_address_username_unique UNIQUE (email_address, username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: contact contact_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: muhammadisa
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

