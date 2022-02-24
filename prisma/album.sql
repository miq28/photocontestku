BEGIN WORK;
LOCK TABLE "Album" IN ACCESS EXCLUSIVE MODE;
DELETE FROM "Album";
insert into "Album" (id,title,description,"coverPhotoId","userId","isPrivate","isDownloadable","createdAt","updatedAt") values
('f6f6b0a4-4174-4878-9105-8bd2c5c50367','Temp','Virtual global capacity',1,1,false,true,'2020-01-14 08:24:17','2020-01-14 10:35:52'),
('c4c09928-a9a2-4816-b7f5-7deb1acc529e','Y-Solowarm','Virtual background open system',11,1,false,true,'2016-05-10 07:17:44','2016-05-10 09:29:19'),
('8bda0167-55b3-4ede-8bda-7fc490f53375','Y-find','Team-oriented reciprocal data-warehouse',21,1,false,true,'2019-06-17 00:40:34','2019-06-17 02:52:09'),
('1e40f044-86e8-401e-b0c6-c4236a75650f','Ventosanzap','Cloned actuating adapter',31,1,true,true,'2019-03-23 09:38:39','2019-03-23 11:50:14'),
('31633ca8-b795-45cb-998e-e1aaec14837c','Duobam','Business-focused full-range policy',41,1,false,false,'2020-06-26 11:25:30','2020-06-26 13:37:05'),
('ddb889d6-f4cf-4a4c-bf8a-1256c166e4f3','Tres-Zap','Networked tangible parallelism',51,2,false,false,'2017-12-30 21:40:36','2017-12-30 23:52:11'),
('83e90ed1-e0bc-41cd-9b93-8aa90c6998ff','Cardguard','Operative asynchronous adapter',61,2,true,true,'2021-08-01 07:01:05','2021-08-01 09:12:40'),
('47807f7a-3a0c-40e6-a1ee-47ccb72e3f60','Namfix','Re-contextualized explicit monitoring',71,2,false,false,'2020-02-02 13:18:49','2020-02-02 15:30:24'),
('35c2eb98-14fc-40ee-91d6-410244a0e6c8','Holdlamis','Visionary full-range hub',81,2,false,false,'2019-05-07 01:34:14','2019-05-07 03:45:49'),
('4534f5f7-f695-4b9b-a182-7fb86b937640','Vagram','Triple-buffered national success',91,2,false,false,'2016-10-04 19:40:35','2016-10-04 21:52:10'),
('949cdfd3-94e5-4ebc-b747-9963cbcdde05','Toughjoyfax','Reactive context-sensitive toolset',101,3,false,true,'2019-06-19 20:48:10','2019-06-19 22:59:45'),
('b7182700-4926-4b38-b982-2037a0515c22','Alphazap','Business-focused multimedia groupware',111,3,false,true,'2019-08-12 23:48:05','2019-08-13 01:59:40'),
('b7b893c8-4f07-4f00-9e36-35ceaae1aad4','Keylex','Assimilated needs-based matrices',121,3,true,false,'2018-05-06 12:53:11','2018-05-06 15:04:46'),
('137cd47c-03d6-4a14-86d0-f0086a61fb4f','Transcof','Synergistic multimedia matrix',131,3,true,true,'2021-01-30 09:51:04','2021-01-30 12:02:39'),
('70c2ac79-3882-4a55-8b5f-eaded7cb52ef','Kanlam','Versatile responsive forecast',141,3,false,false,'2016-06-24 22:53:51','2016-06-25 01:05:26'),
('57439fc1-5e25-4882-a570-14d88b5a77db','Aerified','Proactive cohesive implementation',151,4,true,false,'2016-05-14 03:39:49','2016-05-14 05:51:24'),
('82b097b2-f349-42b3-8e1e-34ee8233b1f0','Flowdesk','Public-key asymmetric moderator',161,4,true,true,'2022-02-14 16:52:06','2022-02-14 19:03:41'),
('d9594e2d-884a-483e-9606-5b18ef65eb7e','Cookley','Operative intangible array',171,4,false,false,'2019-02-09 14:17:49','2019-02-09 16:29:24'),
('268cbbac-32d3-4c06-aa6a-7a22d1b2a81a','Pannier','Triple-buffered encompassing local area network',181,4,true,true,'2021-10-04 17:14:19','2021-10-04 19:25:54'),
('7fa5ff62-fab0-4ddf-9d8b-cef97e06a529','Aerified','User-centric object-oriented solution',191,4,false,false,'2017-06-10 03:11:24','2017-06-10 05:22:59'),
('9676d341-e979-4195-b05a-babc1bda1618','Span','Ameliorated content-based framework',201,5,false,true,'2017-08-13 12:35:21','2017-08-13 14:46:56'),
('95a3ebec-50c4-4199-b17c-00caf83f0a6d','Cookley','Horizontal tangible parallelism',211,5,false,false,'2019-12-23 08:08:15','2019-12-23 10:19:50'),
('6ce67721-f3fd-41de-ab3d-2a1e43437018','Ronstring','Public-key explicit access',221,5,true,false,'2020-10-05 06:45:00','2020-10-05 08:56:35'),
('c38387a4-66f1-4acb-a565-3392e2a3b9d1','Lotlux','Diverse composite emulation',231,5,true,true,'2019-06-26 19:44:07','2019-06-26 21:55:42'),
('ccf5cb8c-68b2-43fd-8109-8beef6f8ddb9','Matsoft','Enhanced zero administration utilisation',241,5,false,true,'2019-11-01 12:39:56','2019-11-01 14:51:31'),
('679769b6-485e-4bf3-919b-2e3074a735d7','Treeflex','Re-contextualized actuating paradigm',251,6,true,false,'2015-09-30 08:51:33','2015-09-30 11:03:08'),
('41800d78-534f-42b7-aa16-ffc19d92d24f','Zaam-Dox','Team-oriented mission-critical firmware',261,6,true,false,'2019-01-26 20:35:31','2019-01-26 22:47:06'),
('3f5ecda3-8577-4fb8-8f29-bc0e4531ab54','Stim','Proactive incremental intranet',271,6,false,false,'2017-12-05 08:56:45','2017-12-05 11:08:20'),
('204ab765-beea-43b6-bd44-2dc505bc2f9a','Andalax','Visionary foreground hardware',281,6,true,true,'2017-05-10 17:33:45','2017-05-10 19:45:20'),
('8f9488e0-162c-4c32-acaa-7029efde3c5a','Y-Solowarm','Customer-focused dedicated Graphical User Interface',291,6,false,true,'2015-12-31 01:00:35','2015-12-31 03:12:10'),
('6b72b85b-ad69-4693-bfc1-0c9d6ab6430c','Y-Solowarm','Optimized foreground monitoring',301,7,true,false,'2018-05-20 05:43:14','2018-05-20 07:54:49'),
('256c63b9-1c32-48c0-a11c-748fe7d5e7e4','Solarbreeze','Exclusive zero administration open architecture',311,7,false,false,'2019-10-21 18:59:59','2019-10-21 21:11:34'),
('ae91f79c-ef40-4d56-a33c-a41cc24dc569','Duobam','Open-architected 24/7 knowledge base',321,7,true,false,'2018-02-24 06:42:22','2018-02-24 08:53:57'),
('1244c66a-366c-4f95-85b0-9769c79c2e0a','Quo Lux','Synergistic systematic moratorium',331,7,false,false,'2020-07-17 09:19:09','2020-07-17 11:30:44'),
('26a72eed-052c-4e60-b493-7f952fecb627','Trippledex','Balanced demand-driven adapter',341,7,true,false,'2018-06-26 15:52:35','2018-06-26 18:04:10'),
('4a9accb7-2084-4487-be1e-f351b2e268de','Lotstring','Intuitive zero tolerance approach',351,8,false,false,'2018-08-27 11:26:53','2018-08-27 13:38:28'),
('5645d8c8-74df-4b48-9e8d-1892cc21f6cd','Zaam-Dox','Business-focused local time-frame',361,8,true,true,'2017-08-13 19:26:01','2017-08-13 21:37:36'),
('32f8b16d-7d97-4b5b-9f74-e697b3cb9f15','Tampflex','User-friendly needs-based secured line',371,8,false,false,'2017-07-19 00:44:37','2017-07-19 02:56:12'),
('f987e0f0-fe1c-4f43-91dc-5ffec3ee79cb','Rank','Persevering cohesive throughput',381,8,true,true,'2019-09-09 18:51:45','2019-09-09 21:03:20'),
('f1fa177f-ec38-46eb-b5ed-108597f9ac43','Tempsoft','Enterprise-wide bandwidth-monitored concept',391,8,true,true,'2019-03-21 20:57:47','2019-03-21 23:09:22'),
('cdfb5792-4d0e-41a0-8c31-8b9bd6be8dec','Sonair','Reduced motivating productivity',401,9,true,true,'2015-09-22 04:50:33','2015-09-22 07:02:08'),
('d03a230a-71af-4e5a-8f88-611776bde3a4','Matsoft','Extended grid-enabled info-mediaries',411,9,true,false,'2019-09-17 08:43:46','2019-09-17 10:55:21'),
('698faea0-0ee8-4c2c-a974-8051763f8307','Holdlamis','Customer-focused systematic utilisation',421,9,false,false,'2022-01-06 06:56:48','2022-01-06 09:08:23'),
('ede9477a-ccfc-40f2-911b-6c03e94f15be','Stim','Realigned intermediate initiative',431,9,true,false,'2017-07-22 20:01:10','2017-07-22 22:12:45'),
('2ccc7609-48a8-4f3b-b487-ce456f19f7af','Otcom','Expanded systematic solution',441,9,false,false,'2016-12-15 00:45:07','2016-12-15 02:56:42'),
('47dd3998-451c-4900-990a-dfa2e4f1dfb8','Regrant','Implemented client-server flexibility',451,10,false,false,'2018-12-21 12:38:41','2018-12-21 14:50:16'),
('ca2aa6bc-1eb2-44eb-8d1a-b584eed85a05','Keylex','Assimilated content-based initiative',461,10,false,true,'2021-12-13 16:26:35','2021-12-13 18:38:10'),
('12877fb3-7bbc-4ea1-9e39-a977ab7ddd01','Stringtough','Multi-lateral heuristic structure',471,10,true,true,'2020-01-16 21:10:22','2020-01-16 23:21:57'),
('c0feaa66-aa9f-4f87-8b0d-d44e4b9e1cf1','Alphazap','Cloned actuating pricing structure',481,10,true,false,'2017-10-19 05:13:27','2017-10-19 07:25:02'),
('f7e7c953-7c74-437b-9fb8-671fbef3f0d4','Daltfresh','Multi-lateral holistic moderator',491,10,true,false,'2019-10-10 20:19:00','2019-10-10 22:30:35'),
('3097d246-959c-42f6-a90c-018e127d08ec','Trippledex','Devolved well-modulated moratorium',501,11,false,false,'2015-12-16 15:00:16','2015-12-16 17:11:51'),
('9e906dd5-77f6-4d15-b3f8-b7479d8d74ba','Tin','Ergonomic national analyzer',511,11,false,false,'2016-01-27 09:46:12','2016-01-27 11:57:47'),
('6f8452fb-970a-4f05-b957-ed4c5af56615','Pannier','Triple-buffered multimedia leverage',521,11,false,false,'2015-12-28 05:14:34','2015-12-28 07:26:09'),
('a1354c7b-9dac-47ab-8eb8-e3d18eff982f','Zathin','Distributed global knowledge user',531,11,true,true,'2015-12-12 06:16:23','2015-12-12 08:27:58'),
('4d6350c7-67e2-4940-99de-8e8326ea7079','Span','Public-key motivating capacity',541,11,true,false,'2019-05-02 07:58:55','2019-05-02 10:10:30'),
('1a863278-3067-410e-8c0a-1c528814ae52','Overhold','Exclusive actuating synergy',551,12,true,true,'2021-05-31 02:30:24','2021-05-31 04:41:59'),
('e97c4f79-5ae6-4965-a7d1-f40242802723','Latlux','Ameliorated national internet solution',561,12,true,true,'2016-05-20 16:44:31','2016-05-20 18:56:06'),
('adf6a1ad-ccc2-4dee-939d-3bf89eee405a','Aerified','Versatile heuristic software',571,12,true,false,'2021-01-18 05:50:01','2021-01-18 08:01:36'),
('819b3453-63d4-4f8d-9deb-5042706bdbfa','Flexidy','Progressive tangible infrastructure',581,12,false,true,'2020-10-29 19:11:36','2020-10-29 21:23:11'),
('e996c7a5-b473-42e3-89a1-2b52904a1cf8','Aerified','Adaptive static portal',591,12,true,true,'2018-09-28 19:13:43','2018-09-28 21:25:18'),
('cb293467-a8fd-4d31-8419-ce99a046c203','Span','Integrated 4th generation portal',601,13,false,true,'2018-11-23 08:15:05','2018-11-23 10:26:40'),
('975de3a3-4543-472b-89b7-15c15d6f3521','Treeflex','Enhanced discrete concept',611,13,false,false,'2018-03-10 21:35:51','2018-03-10 23:47:26'),
('534b67f4-00f0-4ea2-aeef-af33f45b9267','Zoolab','Versatile background array',621,13,true,true,'2016-12-31 18:13:10','2016-12-31 20:24:45'),
('4224b3ec-c68b-4d09-bd52-a95243494de0','Ventosanzap','Triple-buffered web-enabled definition',631,13,true,false,'2021-06-22 23:55:14','2021-06-23 02:06:49'),
('e1ce14de-d362-490e-8fc1-4c7b0b28a267','Treeflex','Cross-platform optimal utilisation',641,13,true,true,'2018-05-09 12:50:25','2018-05-09 15:02:00'),
('4d3fac59-9998-42d6-bd23-5d055bb9c853','Alpha','Synergistic local info-mediaries',651,14,true,true,'2019-07-28 08:14:48','2019-07-28 10:26:23'),
('befa25e6-7c88-4f72-ae04-0ffcfad50b6f','Keylex','Robust bi-directional encoding',661,14,false,true,'2016-06-30 10:41:26','2016-06-30 12:53:01'),
('228088b0-8f5f-47a4-a9b4-d3a58dde6930','Lotstring','Cloned upward-trending encoding',671,14,true,true,'2018-06-24 17:52:31','2018-06-24 20:04:06'),
('2c9b0151-877b-4826-b3b7-e15bca1f31f2','Wrapsafe','Multi-tiered dedicated process improvement',681,14,false,true,'2019-09-18 06:10:12','2019-09-18 08:21:47'),
('add21e92-77d2-4c96-a4e8-2839a127c3e8','Aerified','Compatible 5th generation software',691,14,false,true,'2019-12-05 00:06:58','2019-12-05 02:18:33'),
('4d1e4454-96eb-4ba1-adc5-e5de3358daaa','Mat Lam Tam','Exclusive systemic service-desk',701,15,false,false,'2019-05-23 11:39:26','2019-05-23 13:51:01'),
('ab0e0807-e628-458b-8aeb-20d59cf293ce','Zontrax','Phased stable alliance',711,15,false,true,'2019-06-11 08:11:56','2019-06-11 10:23:31'),
('a811df73-349a-4a64-9907-ce281100a807','Span','Triple-buffered bandwidth-monitored parallelism',721,15,true,false,'2019-04-21 22:39:55','2019-04-22 00:51:30'),
('12ced947-420b-4604-9028-1078402c3bec','Flowdesk','Public-key asynchronous focus group',731,15,false,false,'2021-11-22 06:22:22','2021-11-22 08:33:57'),
('d087323c-7dae-4a1c-b647-297705bdb2d0','Veribet','Diverse object-oriented encryption',741,15,true,true,'2016-11-08 22:50:40','2016-11-09 01:02:15'),
('9e8dd4b8-0631-49f6-b41f-312e2f106ad4','Lotlux','Optional mission-critical model',751,16,false,false,'2021-06-28 00:31:03','2021-06-28 02:42:38'),
('2f9aa418-20f1-4a80-91c6-3cf88c0c2d78','Cookley','Up-sized even-keeled functionalities',761,16,true,false,'2021-06-17 10:28:07','2021-06-17 12:39:42'),
('7c8590db-9a1b-4d79-bce4-8b9f2de83bba','Bitchip','Mandatory explicit extranet',771,16,true,false,'2020-08-01 17:25:01','2020-08-01 19:36:36'),
('166c8b5c-c9b3-4d55-b2fa-3804cf33a278','Biodex','Face to face high-level utilisation',781,16,false,false,'2021-08-20 20:51:37','2021-08-20 23:03:12'),
('d0a079d5-51e7-40f0-9199-a4fed4e6b6f9','Home Ing','Operative encompassing system engine',791,16,false,true,'2016-07-09 00:15:06','2016-07-09 02:26:41'),
('11b3f919-10ea-4e56-93ab-dfd55bab17d5','Span','User-friendly modular productivity',801,17,true,true,'2016-07-09 05:24:41','2016-07-09 07:36:16'),
('d8450f2f-aca3-4caf-a49a-c021e03c0fae','Konklab','Grass-roots system-worthy ability',811,17,true,false,'2017-03-29 09:44:52','2017-03-29 11:56:27'),
('13e5a356-f93a-4cce-802b-88a2ae2dc738','Keylex','Customizable discrete access',821,17,true,true,'2018-11-02 19:53:56','2018-11-02 22:05:31'),
('ee5c7788-b5db-4d3b-a337-0795bfa561fd','Alpha','Re-contextualized clear-thinking initiative',831,17,true,true,'2022-02-19 05:37:21','2022-02-19 07:48:56'),
('973d4d62-729f-48b1-8454-959bfb35ec43','Span','Vision-oriented modular solution',841,17,false,true,'2020-11-01 01:29:34','2020-11-01 03:41:09'),
('dcff8909-6b87-4bb1-88d8-7b2138d1a337','Pannier','Organized 24/7 attitude',851,18,true,true,'2021-09-01 18:17:21','2021-09-01 20:28:56'),
('00556e14-bf74-4ad1-af8b-8e22dcbe0655','Zathin','Adaptive human-resource application',861,18,false,true,'2017-12-09 09:07:04','2017-12-09 11:18:39'),
('3c18bfc4-0e79-41e4-bb98-acb8aff71912','Viva','Persistent systemic architecture',871,18,true,false,'2020-10-05 08:41:14','2020-10-05 10:52:49'),
('910bd897-628f-45ec-8743-823aa943a9fa','Holdlamis','Customer-focused even-keeled function',881,18,false,true,'2017-02-27 03:02:10','2017-02-27 05:13:45'),
('f9debfe6-3feb-40ac-86a6-c1e627cfbf44','Bamity','Team-oriented dynamic secured line',891,18,false,true,'2021-06-12 10:51:19','2021-06-12 13:02:54'),
('3114222f-80dd-4f08-b146-9e5bd9cc9ff5','Cookley','Integrated maximized local area network',901,19,false,true,'2020-03-13 15:47:54','2020-03-13 17:59:29'),
('13166d82-9041-4db2-91e3-ea2c8eb7a48f','Alphazap','Visionary neutral Graphic Interface',911,19,false,true,'2016-01-15 02:54:13','2016-01-15 05:05:48'),
('9d650504-0709-4bff-a210-8d0cc4c42836','Keylex','Synchronised context-sensitive strategy',921,19,false,false,'2020-03-29 19:06:30','2020-03-29 21:18:05'),
('93b4de30-5319-4a4c-a0a1-6bcc1d8986d3','Zathin','Profound mobile system engine',931,19,false,true,'2018-05-22 15:35:41','2018-05-22 17:47:16'),
('2894574a-313a-4da9-9f26-efadab4b9686','Trippledex','Customer-focused bifurcated throughput',941,19,true,true,'2017-12-07 03:48:48','2017-12-07 06:00:23'),
('dfb44e92-fe4a-475f-bdfb-846383eb5396','Home Ing','Advanced dynamic functionalities',951,20,false,true,'2018-10-08 03:12:44','2018-10-08 05:24:19'),
('98d99096-8227-43de-83fd-95d5a5a97555','Zathin','Down-sized tangible database',961,20,false,false,'2016-09-17 21:32:35','2016-09-17 23:44:10'),
('722e820c-2d0b-4a89-852d-1c35c9001541','Konklab','Multi-layered disintermediate synergy',971,20,false,false,'2019-11-25 00:01:57','2019-11-25 02:13:32'),
('570eb4a9-e849-4fdf-b2bd-e762513f7c56','Alphazap','Fundamental uniform solution',981,20,false,true,'2017-10-23 13:08:45','2017-10-23 15:20:20'),
('113eac99-5418-409a-8092-feefc6dbbf44','Aerified','Quality-focused dedicated encryption',991,20,true,false,'2019-06-15 05:14:05','2019-06-15 07:25:40');
COMMIT WORK;