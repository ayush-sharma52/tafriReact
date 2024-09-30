using Microsoft.EntityFrameworkCore;

namespace tafriAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<PackageInstance> PackageInstances { get; set; }

        public DbSet<Traveller> Travellers { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookingDetail> BookingDetails { get; set; }
        public DbSet<Payment> Payments { get; set; }

        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<SpecialAssignedPackage> SpecialAssignedPackages { get; set; }

        public DbSet<Sale> Sales { get; set; }  

        public DbSet<MapLocation> MapLocations { get; set; }

        public DbSet<Review> Reviews { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // Many-to-one relationship for PackagesAssigned
            modelBuilder.Entity<Package>()
                .HasOne(p => p.AssignedUser)
                .WithMany(u => u.PackagesAssigned)
                .HasForeignKey(p => p.AssignedUserId);

            // Many-to-one relationship for PackagesWishlisted
            modelBuilder.Entity<Package>()
                .HasOne(p => p.WishlistedUser)
                .WithMany(u => u.PackagesWishlisted)
                .HasForeignKey(p => p.WishlistedUserId);

            // Many-to-one relationship for PackagesBooked
            modelBuilder.Entity<PackageInstance>()
                .HasOne(pi => pi.User)
                .WithMany(u => u.PackagesBooked)
                .HasForeignKey(pi => pi.UserId);

            // One-to-many relationship for PackagesPublished
            modelBuilder.Entity<User>()
                .HasMany(u => u.PackagesPublished)
                .WithOne(p => p.PublishedByUser)
                .HasForeignKey(p => p.UserId);

            // Configure the many-to-one relationship for PackageInstance
            modelBuilder.Entity<PackageInstance>()
                .HasOne(pi => pi.Package)
                .WithMany() // No need for a navigation property on Package
                .HasForeignKey(pi => pi.PackageId);

            modelBuilder.Entity<PackageInstance>()
                .HasOne(pi => pi.User)
                .WithMany(u => u.PackagesBooked)
                .HasForeignKey(pi => pi.UserId);

            modelBuilder.Entity<Booking>()
               .HasMany(b => b.BookingDetails)
               .WithOne(d => d.Booking)
               .HasForeignKey(d => d.BookingId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Payment)
                .WithOne(p => p.Booking)
                .HasForeignKey<Payment>(p => p.BookingId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<BookingDetail>()
               .HasOne(bd => bd.Traveller)
               .WithOne(t => t.BookingDetail)
               .HasForeignKey<BookingDetail>(bd => bd.TravellerId);

            modelBuilder.Entity<Booking>()
            .HasOne(b => b.Package)
            .WithMany(p => p.Bookings)
            .HasForeignKey(b => b.PackageId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Review>()
           .HasOne(r => r.UserDetail)
           .WithMany() // No navigation property on the User side
           .HasForeignKey(r => r.UserId);

            // Configure unidirectional relationship from Review to Package
            modelBuilder.Entity<Review>()
            .HasOne(r => r.PackageDetail)
            .WithMany() // No navigation property on the Package side
            .HasForeignKey(r => r.PackageId);

        }
    }
}
