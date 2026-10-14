using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TasteMap.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRestaurantTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Restaurants");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Restaurants",
                newName: "RestaurantType");

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Restaurants",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "HasKidsZone",
                table: "Restaurants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasParking",
                table: "Restaurants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasSummerTerrace",
                table: "Restaurants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasWifi",
                table: "Restaurants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPetFriendly",
                table: "Restaurants",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "MaxGuestsCapacity",
                table: "Restaurants",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalTables",
                table: "Restaurants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "HasKidsZone",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "HasParking",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "HasSummerTerrace",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "HasWifi",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "IsPetFriendly",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "MaxGuestsCapacity",
                table: "Restaurants");

            migrationBuilder.DropColumn(
                name: "TotalTables",
                table: "Restaurants");

            migrationBuilder.RenameColumn(
                name: "RestaurantType",
                table: "Restaurants",
                newName: "PhoneNumber");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Restaurants",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
