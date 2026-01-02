using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CleanArchitecture.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIsPaidToTicket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReviews_Airlines_AirlineId",
                table: "AirlineReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReviews_Users_UserId",
                table: "AirlineReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Flights_FlightId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_PassengerId",
                table: "Tickets");

            migrationBuilder.AlterColumn<int>(
                name: "PassengerId",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Tickets",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AirlineReviews",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AirlineId",
                table: "AirlineReviews",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_ReceiverUserId",
                table: "Coupons",
                column: "ReceiverUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_SenderUserId",
                table: "Coupons",
                column: "SenderUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReviews_Airlines_AirlineId",
                table: "AirlineReviews",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReviews_Users_UserId",
                table: "AirlineReviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Users_ReceiverUserId",
                table: "Coupons",
                column: "ReceiverUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Coupons_Users_SenderUserId",
                table: "Coupons",
                column: "SenderUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Flights_FlightId",
                table: "Tickets",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_PassengerId",
                table: "Tickets",
                column: "PassengerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReviews_Airlines_AirlineId",
                table: "AirlineReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_AirlineReviews_Users_UserId",
                table: "AirlineReviews");

            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Users_ReceiverUserId",
                table: "Coupons");

            migrationBuilder.DropForeignKey(
                name: "FK_Coupons_Users_SenderUserId",
                table: "Coupons");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Flights_FlightId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Users_PassengerId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_ReceiverUserId",
                table: "Coupons");

            migrationBuilder.DropIndex(
                name: "IX_Coupons_SenderUserId",
                table: "Coupons");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Tickets");

            migrationBuilder.AlterColumn<int>(
                name: "PassengerId",
                table: "Tickets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "FlightId",
                table: "Tickets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "AirlineReviews",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "AirlineId",
                table: "AirlineReviews",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReviews_Airlines_AirlineId",
                table: "AirlineReviews",
                column: "AirlineId",
                principalTable: "Airlines",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AirlineReviews_Users_UserId",
                table: "AirlineReviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Flights_FlightId",
                table: "Tickets",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Users_PassengerId",
                table: "Tickets",
                column: "PassengerId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
