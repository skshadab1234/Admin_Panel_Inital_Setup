PGDMP  /    4                |            bappa     16.4 (Ubuntu 16.4-1.pgdg24.04+1)     16.4 (Ubuntu 16.4-1.pgdg24.04+1)     }           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ~           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    44238    bappa    DATABASE     q   CREATE DATABASE bappa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE bappa;
                postgres    false            �            1259    44248    admin_registration    TABLE     .  CREATE TABLE public.admin_registration (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    admin_image character varying(255),
    joined_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    phone_number character varying(20),
    admin_status integer DEFAULT 1,
    reset_code text,
    reset_code_expiry text,
    verified jsonb,
    CONSTRAINT admin_registration_admin_status_check CHECK ((admin_status = ANY (ARRAY[1, 2, 3, 4])))
);
 &   DROP TABLE public.admin_registration;
       public         heap    postgres    false            �            1259    44247    admin_registration_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_registration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.admin_registration_id_seq;
       public          postgres    false    216            �           0    0    admin_registration_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.admin_registration_id_seq OWNED BY public.admin_registration.id;
          public          postgres    false    215            �            1259    44262    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    joined_at timestamp with time zone,
    updated_at timestamp with time zone,
    banner_image character varying(255),
    social_links jsonb,
    status integer DEFAULT 1,
    bio text,
    contact_details jsonb
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    44261    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    218            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    217            �           2604    44251    admin_registration id    DEFAULT     ~   ALTER TABLE ONLY public.admin_registration ALTER COLUMN id SET DEFAULT nextval('public.admin_registration_id_seq'::regclass);
 D   ALTER TABLE public.admin_registration ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    44265    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    217    218    218            x          0    44248    admin_registration 
   TABLE DATA           �   COPY public.admin_registration (id, name, email, password, admin_image, joined_date, phone_number, admin_status, reset_code, reset_code_expiry, verified) FROM stdin;
    public          postgres    false    216   �       z          0    44262    users 
   TABLE DATA           �   COPY public.users (user_id, first_name, last_name, username, email, password, joined_at, updated_at, banner_image, social_links, status, bio, contact_details) FROM stdin;
    public          postgres    false    218   [       �           0    0    admin_registration_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.admin_registration_id_seq', 1, true);
          public          postgres    false    215            �           0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);
          public          postgres    false    217            �           2606    44260 /   admin_registration admin_registration_email_key 
   CONSTRAINT     k   ALTER TABLE ONLY public.admin_registration
    ADD CONSTRAINT admin_registration_email_key UNIQUE (email);
 Y   ALTER TABLE ONLY public.admin_registration DROP CONSTRAINT admin_registration_email_key;
       public            postgres    false    216            �           2606    44258 *   admin_registration admin_registration_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.admin_registration
    ADD CONSTRAINT admin_registration_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.admin_registration DROP CONSTRAINT admin_registration_pkey;
       public            postgres    false    216            �           2606    44274    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    218            �           2606    44270    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    218            �           2606    44272    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    218            x   �   x�Uʹ�@ �z�
:#��[I�"	�Wbh8�1��n��ºJ�4������wEݖ��I닕w���(̬Z���tv����{��3*���Ƿ���e�n��z�	_� ��!�@�x�4� �b_1[�,��G钴Wz�U�(-&�=��|�Fb��j�/      z   �   x�m��
�@ E��w�6S�Ғ��
j��KcRG_�ׇ�� �p��	�WR`㊤ �<*><���a��<a(!xt�+��N�QJv�<+�ݘU���ɗHP��8	2a���.�{��g��9TZbF���xܳ����?!�Dh{�a��i��Ĭ�Le�Q����c�[]k3�����%���N��ߊ3�q��Sy     