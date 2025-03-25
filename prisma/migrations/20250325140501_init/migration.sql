-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Site" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "projectManager" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Tunnel" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supervisorId" TEXT,
    "siteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tunnel_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TunnelDimension" (
    "_id" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "mainAxisLength" DOUBLE PRECISION NOT NULL,
    "gradePercentage" DOUBLE PRECISION NOT NULL,
    "designProfileType" TEXT NOT NULL,
    "heightDimensions" DOUBLE PRECISION NOT NULL,
    "widthDimensions" DOUBLE PRECISION NOT NULL,
    "crossSectionArea" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TunnelDimension_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TunnelComponent" (
    "_id" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "componentType" TEXT NOT NULL,
    "distanceFromEntry" INTEGER NOT NULL,
    "length" TEXT NOT NULL,
    "deviationAngle" TEXT NOT NULL,
    "widthDimensions" TEXT NOT NULL,
    "heightDimensions" TEXT NOT NULL,
    "supported" BOOLEAN NOT NULL,
    "gradePercentage" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TunnelComponent_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TunnelAdvancement" (
    "_id" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "crosscutId" TEXT,
    "lengthAdvanced" DOUBLE PRECISION NOT NULL,
    "processType" TEXT NOT NULL,
    "faceVideoUrl" TEXT,
    "gradePercentage" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TunnelAdvancement_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "BlastLog" (
    "_id" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blastLocation" TEXT NOT NULL,
    "blastId" TEXT NOT NULL,
    "rockType" TEXT NOT NULL,
    "groundStability" TEXT NOT NULL,
    "waterPresence" TEXT NOT NULL,
    "groundTemperature" DOUBLE PRECISION NOT NULL,
    "numberOfHoles" INTEGER NOT NULL,
    "holeDepth" DOUBLE PRECISION NOT NULL,
    "holeDiameter" DOUBLE PRECISION NOT NULL,
    "holeCondition" TEXT NOT NULL,
    "ventilationPlan" BOOLEAN NOT NULL DEFAULT false,
    "areaEvacuated" BOOLEAN NOT NULL DEFAULT false,
    "personnelAccounted" BOOLEAN NOT NULL DEFAULT false,
    "equipmentRemoved" BOOLEAN NOT NULL DEFAULT false,
    "teamLeadSignature" TEXT,
    "teamMembers" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "BlastLog_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ProductionReport" (
    "_id" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "dailyPlan" DOUBLE PRECISION NOT NULL,
    "bookedMeter" DOUBLE PRECISION NOT NULL,
    "actualMeter" DOUBLE PRECISION NOT NULL,
    "variance" DOUBLE PRECISION NOT NULL,
    "materialExcavated" INTEGER NOT NULL,
    "wasteExcavated" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductionReport_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "IncidentReport" (
    "_id" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "incidentType" TEXT NOT NULL,
    "peopleInvolved" TEXT NOT NULL,
    "rootCauseAnalysis" TEXT NOT NULL,
    "measuresTaken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentReport_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "incidentReportId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "SiteInspection" (
    "_id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "tunnelId" TEXT,
    "shift" TEXT,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteInspection_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "_id" TEXT NOT NULL,
    "manpowerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkInTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOutTime" TIMESTAMP(3),
    "hoursWorked" DOUBLE PRECISION,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Manpower" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "tunnelId" TEXT NOT NULL,
    "siteInspectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Manpower_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "_id" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "present" BOOLEAN NOT NULL DEFAULT false,
    "tunnelId" TEXT NOT NULL,
    "siteInspectionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Warning" (
    "_id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "message" TEXT,
    "manpowerId" TEXT,
    "equipmentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Warning_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_roleId_key" ON "UserRole"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Tunnel_name_key" ON "Tunnel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_manpowerId_date_key" ON "Attendance"("manpowerId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Warning_manpowerId_key" ON "Warning"("manpowerId");

-- CreateIndex
CREATE UNIQUE INDEX "Warning_equipmentId_key" ON "Warning"("equipmentId");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tunnel" ADD CONSTRAINT "Tunnel_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tunnel" ADD CONSTRAINT "Tunnel_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TunnelDimension" ADD CONSTRAINT "TunnelDimension_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TunnelComponent" ADD CONSTRAINT "TunnelComponent_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TunnelAdvancement" ADD CONSTRAINT "TunnelAdvancement_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlastLog" ADD CONSTRAINT "BlastLog_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionReport" ADD CONSTRAINT "ProductionReport_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentReport" ADD CONSTRAINT "IncidentReport_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_incidentReportId_fkey" FOREIGN KEY ("incidentReportId") REFERENCES "IncidentReport"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteInspection" ADD CONSTRAINT "SiteInspection_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteInspection" ADD CONSTRAINT "SiteInspection_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteInspection" ADD CONSTRAINT "SiteInspection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_manpowerId_fkey" FOREIGN KEY ("manpowerId") REFERENCES "Manpower"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manpower" ADD CONSTRAINT "Manpower_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manpower" ADD CONSTRAINT "Manpower_siteInspectionId_fkey" FOREIGN KEY ("siteInspectionId") REFERENCES "SiteInspection"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_tunnelId_fkey" FOREIGN KEY ("tunnelId") REFERENCES "Tunnel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_siteInspectionId_fkey" FOREIGN KEY ("siteInspectionId") REFERENCES "SiteInspection"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warning" ADD CONSTRAINT "Warning_manpowerId_fkey" FOREIGN KEY ("manpowerId") REFERENCES "Manpower"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warning" ADD CONSTRAINT "Warning_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
