-- USE ONLY TO PREPARE A TEST DATABASE

-- ================================== --
-- EXAMPLES: USE TO TEST FOREIGN KEYS --
-- ================================== --

-- Example paragraph

INSERT INTO PARAGRAPH(ID, CONTENT)
VALUES (1, 'Example paragraph');

-- Example image

INSERT INTO IMAGE(ID, DATA, ALT)
VALUES (1, 0, 'example-image');

-- Example person

INSERT INTO PERSON(ID, NAME, SURNAME, EMAIL, GENDER)
VALUES (1, 'Example', 'Person', 'example.person@mail.com', 'O');

-- ============ --
-- TEST OBJECTS --
-- ============ --

-- Minimal about: 1 paragraph, 0 image

INSERT INTO ABOUT (ID) VALUES (1);

INSERT INTO ABOUT_PARAGRAPH (ABOUT_ID, PARAGRAPH_ID)
VALUES (1, 1);

-- Small about: 1 paragraph, 1 image

INSERT INTO ABOUT (ID) VALUES (2);

INSERT INTO ABOUT_PARAGRAPH (ABOUT_ID, PARAGRAPH_ID)
VALUES (2, 1);

INSERT INTO ABOUT_IMAGE (ABOUT_ID, IMAGE_ID)
VALUES (2, 1);

-- Minimal country: 1 image

INSERT INTO COUNTRY(ID, NAME)
VALUES (1, 'Minimal country');

INSERT INTO COUNTRY_IMAGE (COUNTRY_ID, IMAGE_ID)
VALUES (1, 1);

-- Minimal fight: 1 title, 1 summary, 1 paragraph, 1 referent (person)

INSERT INTO FIGHT(ID, TITLE, SUMMARY)
VALUES (1, 'Minimal title', 'Minimal summary');

INSERT INTO FIGHT_PARAGRAPH(FIGHT_ID, PARAGRAPH_ID)
VALUES (1, 1);

INSERT INTO FIGHT_PERSON(FIGHT_ID, PERSON_ID)
VALUES (1, 1);

-- Minimal history: 1 title, 1 paragraph, 1 image

INSERT INTO HISTORY(ID, TITLE)
VALUES (1, 'Minimal history');

INSERT INTO HISTORY_PARAGRAPH(HISTORY_ID, PARAGRAPH_ID)
VALUES (1, 1);

INSERT INTO HISTORY_IMAGE(HISTORY_ID, IMAGE_ID)
VALUES (1, 1);

-- Minimal image: 1 alt, 1 data

INSERT INTO IMAGE(ID, ALT, DATA)
VALUES (2, 'minimal-image', LOAD_FILE('/var/lib/mysql-files/resources/minimal-image.png')); -- expects to be run in the dev Docker container

-- Simple image: 1 alt, 1 data, 1 caption

INSERT INTO IMAGE(ID, ALT, DATA, CAPTION)
VALUES (
    3, 
    'simple-image', 
    LOAD_FILE('/var/lib/mysql-files/resources/simple-image.png'), -- expects to be run in the dev Docker container
    'Simple image'
);

-- Minimal news: 1 title, 1 summary, 1 paragraph, 1 person (author)

INSERT INTO NEWS(ID, TITLE, SUMMARY)
VALUES (1, 'Minimal news', 'A summary');

INSERT INTO NEWS_PARAGRAPH(NEWS_ID, PARAGRAPH_ID)
VALUES (1, 1);

INSERT INTO NEWS_PERSON(NEWS_ID, PERSON_ID)
VALUES (1, 1);

-- Minimal paragraph: 1 content

INSERT INTO PARAGRAPH(ID, CONTENT)
VALUES (2, 'A minimal paragraph');
