import { Injectable } from "@nestjs/common";
import MySQLConfig from "../builder/config";
import MySQLClient from "../clients/mysql.client";
import { dbNamesEnum } from "../constants/dbNames.enum";
import AddRestaurantDto from "src/app/restaurant/dto/addRestaurants.dto";
import DeleteRestaurantDto from "src/app/restaurant/dto/deleteRestaurants.dto";
import GetRestaurantByIdDto from "src/app/restaurant/dto/getRestaurantById.dto";
import GetRestaurantByNameDto from "src/app/restaurant/dto/getRestaurantByName.dto";
import UpdateAddressDto from "src/app/restaurant/dto/updateAddress.dto";

@Injectable()
export default class RestaurantDB {
  constructor(private readonly mySqlConfig: MySQLConfig) {}

  async addRestaurant(addRestaurantParams: AddRestaurantDto): Promise<any> {
    const { name, address } = addRestaurantParams;

    const sql = `INSERT INTO restaurants (name, address) VALUES ("${name}", "${address}");`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurants(): Promise<any> {
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        "select * from restaurants",
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantById(
    getRestaurantByIdParams: GetRestaurantByIdDto
  ): Promise<any> {
    const { id } = getRestaurantByIdParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select * from restaurants where id = ${id}`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantByNameAndAdress(
    getRestaurantByNameParams: GetRestaurantByNameDto
  ): Promise<any> {
    const { name, address } = getRestaurantByNameParams;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        `select * from restaurants where upper(name) = upper("${name}") and upper(address) = upper("${address}");`,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteRestaurant(
    deleteRestaurantParams: DeleteRestaurantDto
  ): Promise<any> {
    const { id } = deleteRestaurantParams;

    const sql = `DELETE FROM restaurants WHERE ID = ${id};`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }

  async updateAddressForRestaurant(
    updateAddressParams: UpdateAddressDto
  ): Promise<any> {
    const { id, address } = updateAddressParams;

    const sql = `UPDATE restaurants set address = "${address}" WHERE ID = ${id};`;
    try {
      return await MySQLClient.runQuery(
        dbNamesEnum.DB,
        sql,
        this.mySqlConfig.config[dbNamesEnum.DB]
      );
    } catch (error) {
      throw error;
    }
  }
}
