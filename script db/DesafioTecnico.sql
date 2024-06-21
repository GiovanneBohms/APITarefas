-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema DesafioTecnico
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DesafioTecnico
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DesafioTecnico` DEFAULT CHARACTER SET utf8 ;
USE `DesafioTecnico` ;

-- -----------------------------------------------------
-- Table `DesafioTecnico`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DesafioTecnico`.`usuario` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `DesafioTecnico`.`tarefa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DesafioTecnico`.`tarefa` (
  `id_tarefa` INT(11) NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_id_usuario` INT(11) NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tarefa`),
  INDEX `fk_tarefa_usuario_idx` (`usuario_id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_tarefa_usuario`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `DesafioTecnico`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
