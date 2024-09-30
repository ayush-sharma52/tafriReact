﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using tafriAPI.Models;

#nullable disable

namespace tafriAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240909111326_updated")]
    partial class updated
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("tafriAPI.Models.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("BookingId"));

                    b.Property<DateTime>("BookingDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("BookingId");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("tafriAPI.Models.BookingDetail", b =>
                {
                    b.Property<int>("BookingDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("BookingDetailId"));

                    b.Property<int>("BookingId")
                        .HasColumnType("int");

                    b.Property<int>("TravellerId")
                        .HasColumnType("int");

                    b.HasKey("BookingDetailId");

                    b.HasIndex("BookingId");

                    b.HasIndex("TravellerId")
                        .IsUnique();

                    b.ToTable("BookingDetails");
                });

            modelBuilder.Entity("tafriAPI.Models.MapLocation", b =>
                {
                    b.Property<int>("MapId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("MapId"));

                    b.Property<double>("Lattitude")
                        .HasColumnType("double");

                    b.Property<double>("Longitude")
                        .HasColumnType("double");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("MapId");

                    b.ToTable("MapLocations");
                });

            modelBuilder.Entity("tafriAPI.Models.Package", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AssignedUserId")
                        .HasColumnType("int");

                    b.Property<int>("Available")
                        .HasColumnType("int");

                    b.Property<int>("Count")
                        .HasColumnType("int");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Details")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<decimal>("FinalPrice")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Hold")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("OnHold")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(65,30)");

                    b.Property<bool>("Released")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<bool>("Visible")
                        .HasColumnType("tinyint(1)");

                    b.Property<int?>("WishlistedUserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AssignedUserId");

                    b.HasIndex("UserId");

                    b.HasIndex("WishlistedUserId");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("tafriAPI.Models.PackageInstance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsAvailable")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("PackageInstances");
                });

            modelBuilder.Entity("tafriAPI.Models.Payment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("PaymentId"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("BookingId")
                        .HasColumnType("int");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PaymentStatus")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("TransactionId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("PaymentId");

                    b.HasIndex("BookingId")
                        .IsUnique();

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("tafriAPI.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsAnonymous")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("tafriAPI.Models.Sale", b =>
                {
                    b.Property<int>("SaleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("SaleId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<double>("Discount")
                        .HasColumnType("double");

                    b.Property<string>("SaleDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SaleType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("SaleId");

                    b.ToTable("Sales");
                });

            modelBuilder.Entity("tafriAPI.Models.SpecialAssignedPackage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("SpecialAssignedPackages");
                });

            modelBuilder.Entity("tafriAPI.Models.Traveller", b =>
                {
                    b.Property<int>("TravellerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("TravellerId"));

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("TravellerId");

                    b.ToTable("Travellers");
                });

            modelBuilder.Entity("tafriAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AccountNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("Address")
                        .HasColumnType("longtext");

                    b.Property<string>("CompanyName")
                        .HasColumnType("longtext");

                    b.Property<string>("ContactPerson")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("EmailId")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsAuthorized")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("tafriAPI.Models.Wishlist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PackageId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Wishlists");
                });

            modelBuilder.Entity("tafriAPI.Models.Booking", b =>
                {
                    b.HasOne("tafriAPI.Models.Package", "Package")
                        .WithMany("Bookings")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("tafriAPI.Models.User", "User")
                        .WithMany("Bookings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");

                    b.Navigation("User");
                });

            modelBuilder.Entity("tafriAPI.Models.BookingDetail", b =>
                {
                    b.HasOne("tafriAPI.Models.Booking", "Booking")
                        .WithMany("BookingDetails")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("tafriAPI.Models.Traveller", "Traveller")
                        .WithOne("BookingDetail")
                        .HasForeignKey("tafriAPI.Models.BookingDetail", "TravellerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");

                    b.Navigation("Traveller");
                });

            modelBuilder.Entity("tafriAPI.Models.Package", b =>
                {
                    b.HasOne("tafriAPI.Models.User", "AssignedUser")
                        .WithMany("PackagesAssigned")
                        .HasForeignKey("AssignedUserId");

                    b.HasOne("tafriAPI.Models.User", "PublishedByUser")
                        .WithMany("PackagesPublished")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("tafriAPI.Models.User", "WishlistedUser")
                        .WithMany("PackagesWishlisted")
                        .HasForeignKey("WishlistedUserId");

                    b.Navigation("AssignedUser");

                    b.Navigation("PublishedByUser");

                    b.Navigation("WishlistedUser");
                });

            modelBuilder.Entity("tafriAPI.Models.PackageInstance", b =>
                {
                    b.HasOne("tafriAPI.Models.Package", "Package")
                        .WithMany()
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("tafriAPI.Models.User", "User")
                        .WithMany("PackagesBooked")
                        .HasForeignKey("UserId");

                    b.Navigation("Package");

                    b.Navigation("User");
                });

            modelBuilder.Entity("tafriAPI.Models.Payment", b =>
                {
                    b.HasOne("tafriAPI.Models.Booking", "Booking")
                        .WithOne("Payment")
                        .HasForeignKey("tafriAPI.Models.Payment", "BookingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");
                });

            modelBuilder.Entity("tafriAPI.Models.Review", b =>
                {
                    b.HasOne("tafriAPI.Models.Package", "PackageDetail")
                        .WithMany()
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("tafriAPI.Models.User", "UserDetail")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PackageDetail");

                    b.Navigation("UserDetail");
                });

            modelBuilder.Entity("tafriAPI.Models.Booking", b =>
                {
                    b.Navigation("BookingDetails");

                    b.Navigation("Payment")
                        .IsRequired();
                });

            modelBuilder.Entity("tafriAPI.Models.Package", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("tafriAPI.Models.Traveller", b =>
                {
                    b.Navigation("BookingDetail");
                });

            modelBuilder.Entity("tafriAPI.Models.User", b =>
                {
                    b.Navigation("Bookings");

                    b.Navigation("PackagesAssigned");

                    b.Navigation("PackagesBooked");

                    b.Navigation("PackagesPublished");

                    b.Navigation("PackagesWishlisted");
                });
#pragma warning restore 612, 618
        }
    }
}
