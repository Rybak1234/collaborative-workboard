import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await req.json();
  const task = await Task.findByIdAndUpdate(params.id, {
    title: body.title,
    description: body.description,
    column: body.column,
    priority: body.priority,
    assignedTo: body.assignedTo,
    order: body.order,
  }, { new: true, runValidators: true });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(task);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const task = await Task.findByIdAndDelete(params.id);
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}
