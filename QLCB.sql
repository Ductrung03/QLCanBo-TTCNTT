CREATE DATABASE QLcanbo;

USE QLcanbo;
GO

CREATE TABLE Role (
	roleId INT IDENTITY(1,1) PRIMARY KEY,
	roleName NVARCHAR(100) NOT NULL,
	createDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE [User] (
	UserId INT IDENTITY(1,1) PRIMARY KEY,
	Username NVARCHAR(100) NOT NULL,
	Email NVARCHAR(100),
	Password NVARCHAR(100) NOT NULL,
	createDate DATETIME DEFAULT GETDATE(),
	FullName NVARCHAR(100),
	UserType NVARCHAR(100)
);

CREATE TABLE Role_User (
	UserId INT NOT NULL,
	roleId INT NOT NULL,
	isActive BIT DEFAULT 1,
	PRIMARY KEY (UserId, roleId),
	FOREIGN KEY (UserId) REFERENCES [User](UserId),
	FOREIGN KEY (roleId) REFERENCES Role(roleId)
);

CREATE TABLE DonVi (
	MaDV INT IDENTITY(1,1) PRIMARY KEY,
	TenDV NVARCHAR(255)
);

CREATE TABLE CanBo (
	[MaCB] [int] IDENTITY(1,1) PRIMARY KEY,
	[HoTenKhaiSinh] [nvarchar](50) NULL,
	[HoTenThuongDung] [nvarchar](50) NULL,
	[BiDanh] [nvarchar](50) NULL,
	[GioiTinh] [nvarchar](3) NULL,
	[CapBac] [nvarchar](20) NULL,
	[ChucVu] [nvarchar](50) NULL,
	[MaDV] [int] NULL,
	[NgaySinh] [date] NULL,
	[NoiSinh] [nvarchar](500) NULL,
	[QueQuan] [nvarchar](500) NULL,
	[NoiDKHK] [nvarchar](500) NULL,
	[NoiTamTru] [nvarchar](500) NULL,
	[DanToc] [nvarchar](15) NULL,
	[TonGiao] [nvarchar](20) NULL,
	[ThanhPhanGD] [nvarchar](50) NULL,
	[NgheNghiep] [nvarchar](50) NULL,
	[Ngayvaodang] [date] NULL,
	[Ngaychinhthuc] [date] NULL,
	[Chibo] [nvarchar](50) NULL,
	[Ngayvaodoan] [date] NULL,
	[Noiketnap] [nvarchar](50) NULL,
	[Trangthaidang] [nvarchar](50) NULL,
	[QuaTrinhPhanDau] [nvarchar](500) NULL,
	[NgayNhapNgu] [date] NULL,
	[NgayCongTac] [date] NULL,
	[ThamGiaTCXH] [nvarchar](50) NULL,
	[NgayThamGiaCM] [date] NULL,
	[GDPT] [nvarchar](20) NULL,
	[ChuyenMonNV] [nvarchar](50) NULL,
	[LyLuanCT] [nvarchar](50) NULL,
	[NgoaiNgu] [nvarchar](50) NULL,
	[HocHam] [nvarchar](50) NULL,
	[HocVi] [nvarchar](50) NULL,
	[CongTacDangLam] [nvarchar](100) NULL,
	[SoCCCD] [char](12) NULL,
	[Anh] [image] NULL,
	[TrangThai] [nvarchar](20) NULL,
	[NgayTao] [datetime] NULL,
	[NgaySua] [datetime] NULL,
	FOREIGN KEY (MaDV) REFERENCES DonVi(MaDV)
);

CREATE TABLE QuaTrinhCongTac (
	MaQTCT INT IDENTITY(1,1) PRIMARY KEY,
	MaCB INT NOT NULL,
	ChucVu NVARCHAR(255),
	ThoiGianBatDau DATE,
	ThoiGianKetThuc DATE,
	FOREIGN KEY (MaCB) REFERENCES CanBo(MaCB)
);

CREATE TABLE Loai_BC (
    MaLBC INT IDENTITY(1,1) PRIMARY KEY,
    LoaiBangCap NVARCHAR(100) NOT NULL
);

CREATE TABLE BangCap (
    MaBC INT IDENTITY(1,1) PRIMARY KEY,
    MaGV INT NOT NULL,
    MaLBC INT NOT NULL,
    NguoiTao NVARCHAR(100),
    SoHieuVanBan NVARCHAR(100) NOT NULL,
    ChuyenNganh NVARCHAR(255),
    NamTotNghiep NVARCHAR(10),
    TruongCapBang NVARCHAR(255),
    HeDaoTao NVARCHAR(100),
    NgayCap DATE,
    FileScan NVARCHAR(500),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    ThoiGianTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaGV) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaLBC) REFERENCES Loai_BC(MaLBC)
);

CREATE TABLE LichSuThayDoi_BC (
    MaLSTD INT IDENTITY(1,1) PRIMARY KEY,
    MaBC INT NOT NULL,
    NoiDungThayDoi NVARCHAR(MAX),
    ThoiGianThayDoi DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaBC) REFERENCES BangCap(MaBC)
);

CREATE TABLE HocPhan (
    MaHP INT IDENTITY(1,1) PRIMARY KEY,
    TenMonHoc NVARCHAR(255),
    SoTinChi NVARCHAR(10),
    SoTiet NVARCHAR(10),
    NgayBatDau DATE,
    NgayKetThuc DATE,
    HinhThucThi NVARCHAR(50) DEFAULT N'Vấn đáp',
    GhiChu NVARCHAR(MAX)
);

CREATE TABLE NoiDung_HP (
	MaNDHP INT IDENTITY(1,1) PRIMARY KEY,
	MaHP INT NOT NULL,
	TenBai NVARCHAR(255),
	HinhThuc NVARCHAR(255),
	GhiChu NVARCHAR(500),
	FOREIGN KEY (MaHP) REFERENCES HocPhan(MaHP)
);

CREATE TABLE DeXuatHocPhan (
    MaDXHP INT IDENTITY(1,1) PRIMARY KEY,
    MaHP INT NOT NULL,
    TaiLieu NVARCHAR(MAX),
    KhoiKienThuc NVARCHAR(255),
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    MaNguoiDuyet INT NOT NULL,
    NgayDuyet DATE,
    ThoiGianTao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaHP) REFERENCES HocPhan(MaHP),
    FOREIGN KEY (MaNguoiDuyet) REFERENCES CanBo(MaCB)
);

CREATE TABLE KeHoachGiangDay (
    MaKH INT IDENTITY(1,1) PRIMARY KEY,
    MaHP INT NOT NULL,
    MaBoMon INT NOT NULL, 
    NamHoc NVARCHAR(10),
    Lop NVARCHAR(10),
    KhoaHoc NVARCHAR(10),
    HocKy NVARCHAR(10),
    NganhDaoTao NVARCHAR(100),
    MaNguoiTao INT NOT NULL,
    TrangThai NVARCHAR(50) DEFAULT N'Chờ duyệt',
    NgayTao DATETIME DEFAULT GETDATE(),
    MaNguoiDuyet INT NOT NULL,
    NgayDuyet DATE,
    MaGV INT NOT NULL,
    FOREIGN KEY (MaBoMon) REFERENCES DonVi(MaDV),
    FOREIGN KEY (MaHP) REFERENCES HocPhan(MaHP),
    FOREIGN KEY (MaNguoiTao) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaNguoiDuyet) REFERENCES CanBo(MaCB),
    FOREIGN KEY (MaGV) REFERENCES CanBo(MaCB)
);

CREATE TABLE TaiLieuHocTap (
    MaTL INT IDENTITY(1,1) PRIMARY KEY,
    MaKH INT NOT NULL,
    TenTaiLieu NVARCHAR(255),
    LoaiTaiLieu NVARCHAR(50),
    FileScan NVARCHAR(500),
    FOREIGN KEY (MaKH) REFERENCES KeHoachGiangDay(MaKH)
);

CREATE TABLE DeTai (
    MaDT INT IDENTITY(1,1) PRIMARY KEY,
    TenDeTai NVARCHAR(255) NOT NULL,
    LinhVuc NVARCHAR(255),
    KinhPhiDK DECIMAL(18,2),
    CapQuanLy NVARCHAR(100),
    NgayBatDau DATE,
    NgayKetThucDK DATE,
    TrangThai NVARCHAR(100),
    MucTieu NVARCHAR(MAX),
    DonViChuTri INT NOT NULL,
    FOREIGN KEY (DonViChuTri) REFERENCES DonVi(MaDV)
);

CREATE TABLE ThanhVienDeTai (
    MaTVDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    MaGV INT NOT NULL,
    VaiTro NVARCHAR(100),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT),
    FOREIGN KEY (MaGV) REFERENCES CanBo(MaCB)
);

CREATE TABLE TaiChinhDeTai (
    MaTCDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    TenKhoanChi NVARCHAR(255),
    LoaiChiPhi NVARCHAR(100),
    DuToan DECIMAL(18,2),
    ThucChi DECIMAL(18,2),
    NgayChi DATE,
    TrangThai NVARCHAR(100) DEFAULT N'Chưa cấp kinh phí',
    GhiChu NVARCHAR(MAX),
    NguoiThucHien INT NOT NULL,
    FileHoaDon NVARCHAR(500),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT),
    FOREIGN KEY (NguoiThucHien) REFERENCES ThanhVienDeTai(MaTVDT)
);

CREATE TABLE TienDoDeTai (
    MaTDDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    MocThoiGian DATE,
    NoiDung NVARCHAR(MAX),
    TrangThai NVARCHAR(100),
    KetQua NVARCHAR(MAX),
    KhoKhan NVARCHAR(MAX),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT)
);

CREATE TABLE TaiLieuDeTai (
    MaTLDT INT IDENTITY(1,1) PRIMARY KEY,
    MaDT INT NOT NULL,
    TieuDe NVARCHAR(255),
    FileScan NVARCHAR(500),
    FOREIGN KEY (MaDT) REFERENCES DeTai(MaDT)
);



---------------
INSERT INTO Role (roleName) VALUES (N'ADMIN');
INSERT INTO Role (roleName) VALUES (N'PhongDaoTao');
INSERT INTO Role (roleName) VALUES (N'GiangVien');
INSERT INTO DonVi (TenDV)
VALUES 
(N'Khoa Công nghệ thông tin'),
(N'Khoa Điện tử viễn thông'),
(N'Phòng Đào Tạo');
INSERT INTO Loai_BC (LoaiBangCap)
VALUES 
(N'Cử nhân'),
(N'Thạc sĩ'),
(N'Tiến sĩ');
INSERT INTO CanBo (MaDV, HoTenKhaiSinh, GioiTinh, CapBac, NgaySinh, NoiDKHK, QueQuan)
VALUES 
(1, N'Trần Văn Hùng', N'Nam', N'Thượng úy', '1985-03-20', N'Hà Nội', N'Hà Nam'),
(2, N'Nguyễn Thị Mai', N'Nữ', N'Đại úy', '1990-07-10', N'Đà Nẵng', N'Thanh Hóa'),
(3, N'Lê Văn Bình', N'Nam', N'Thiếu tá', '1980-11-02', N'HCM', N'Quảng Nam');

INSERT INTO QuaTrinhCongTac (MaCB, ChucVu, ThoiGianBatDau, ThoiGianKetThuc)
VALUES 
(1, N'Giảng viên', '2015-09-01', null),
(2, N'Phó trưởng khoa', '2021-01-01', NULL),
(3, N'Trưởng bộ môn', '2017-07-01', null);
INSERT INTO BangCap (MaGV, MaLBC, NguoiTao, SoHieuVanBan, ChuyenNganh, NamTotNghiep, TruongCapBang, HeDaoTao, NgayCap, FileScan, TrangThai)
VALUES 
(1, 1, null, N'SHV001', N'Công nghệ phần mềm', '2008', N'Đại học Bách Khoa', N'Chính quy', '2008-06-01', null, N'Đã duyệt'),
(2, 2, null, N'SHV002', N'Viễn thông', '2012', N'ĐH Bách Khoa Hà Nội', N'Văn bằng 2', '2012-06-01', null, N'Chờ duyệt'),
(3, 3, null, N'CC223344', N'Trí tuệ nhân tạo', '2015', N'ĐH CNTT TPHCM', N'Chứng chỉ', '2015-06-01', null, N'Bị từ chối');
INSERT INTO HocPhan (TenMonHoc, SoTinChi, SoTiet, NgayBatDau, NgayKetThuc, HinhThucThi)
VALUES 
(N'Lập trình Python', '3', '45', '2024-01-15', '2024-05-15', N'Trắc nghiệm'),
(N'Thiết kế mạch số', '3', '45', '2024-02-01', '2024-06-01', N'Thực hành'),
(N'Trí tuệ nhân tạo', '4', '60', '2024-03-01', '2024-07-01', N'Viết');
INSERT INTO DeTai (TenDeTai, LinhVuc, KinhPhiDK, CapQuanLy, NgayBatDau, NgayKetThucDK, TrangThai, MucTieu, DonViChuTri)
VALUES 
(N'Ứng dụng AI trong giáo dục', N'Trí tuệ nhân tạo', 20000000, N'Cấp trường', '2024-01-01', '2024-12-31', N'Chưa bắt đầu', N'Tối ưu hóa hệ thống quản lý học tập', 1),
(N'Phân tích dữ liệu lớn', N'Khoa học dữ liệu', 30000000, N'Cấp bộ', '2024-02-01', '2024-12-31', N'Đang nghiên cứu', N'Tăng tốc xử lý big data', 2),
(N'Bảo mật hệ thống mạng quân sự', N'An toàn thông tin', 50000000, N'Cấp nhà nước', '2024-03-01', '2025-03-01', N'Hoàn thành nghiên cứu', N'Đảm bảo an ninh thông tin mạng', 3);

