# USE ONLY TO PREPARE A TEST DATABASE

# ================================== #
# EXAMPLES: USE TO TEST FOREIGN KEYS #
# ================================== #

# Example paragraph

INSERT INTO PARAGRAPH(ID, CONTENT)
VALUES (1, 'Example paragraph');

# Example image

INSERT INTO IMAGE(ID, DATA, ALT)
VALUES (1, 0, 'example-image');

# Example person

INSERT INTO PERSON(ID, NAME, SURNAME, EMAIL, GENDER)
VALUES (1, 'Example', 'Person', 'example.person@mail.com', 'O');

# ============ #
# TEST OBJECTS #
# ============ #

# Minimal about: 1 paragraph, 0 image

INSERT INTO ABOUT (ID) VALUES (1);

INSERT INTO ABOUT_PARAGRAPH (ABOUT_ID, PARAGRAPH_ID)
VALUES (1, 1);

# Small about: 1 paragraph, 1 image

INSERT INTO ABOUT (ID) VALUES (2);

INSERT INTO ABOUT_PARAGRAPH (ABOUT_ID, PARAGRAPH_ID)
VALUES (2, 1);

INSERT INTO ABOUT_IMAGE (ABOUT_ID, IMAGE_ID)
VALUES (2, 1);

# Minimal country: 1 image

INSERT INTO COUNTRY(ID, NAME)
VALUES (1, 'Minimal country');

INSERT INTO COUNTRY_IMAGE (COUNTRY_ID, IMAGE_ID)
VALUES (1, 1);

# Minimal fight: 1 title, 1 summary, 1 paragraph, 1 referent (person)

INSERT INTO FIGHT(ID, TITLE, SUMMARY)
VALUES (1, 'Minimal title', 'Minimal summary');

INSERT INTO FIGHT_PARAGRAPH(FIGHT_ID, PARAGRAPH_ID)
VALUES (1, 1);

INSERT INTO FIGHT_PERSON(FIGHT_ID, PERSON_ID)
VALUES (1, 1);
