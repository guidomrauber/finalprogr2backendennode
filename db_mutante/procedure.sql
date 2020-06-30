USE mutante;

DELIMITER $$
USE `mutante`$$

CREATE PROCEDURE `mutanteAddOrEdit` (
  IN _id INT,
  IN _dna VARCHAR(45),
  IN _condicion VARCHAR(45)
)
BEGIN 
  IF _id = 0 THEN
    INSERT INTO mutante (dna, condicion)
    VALUES (_dna, _condicion);

    SET _id = LAST_INSERT_ID();
  ELSE
    UPDATE mutante
    SET
    dna = _dna,
    condicion = _condicion
    WHERE id = _id;
  END IF;

  SELECT _id AS 'id';
END
