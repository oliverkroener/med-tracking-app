import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const prescriptions = await prisma.prescription.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(prescriptions);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prescriptions from database' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const prescription = await prisma.prescription.create({
      data: {
        patientId: body.patientId,
  	    doctorId: body.doctorId,
        medication: body.medication,
        frequency: body.frequency,
        duration: body.duration,
        // Add userId from session if needed
      },
    });

    return NextResponse.json(prescription, { status: 201 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create prescription' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Prescription ID is required' },
        { status: 400 }
      );
    }

    const prescription = await prisma.prescription.update({
      where: { id },
      data: {
        patientName: body.patientName,
        medication: body.medication,
        dosage: body.dosage,
        frequency: body.frequency,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: body.status,
      },
    });

    return NextResponse.json(prescription);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update prescription' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Prescription ID is required' },
        { status: 400 }
      );
    }

    await prisma.prescription.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete prescription' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
