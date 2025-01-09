'use client';

import { cn } from '@/lib/utils';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import React, { useState, memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface WorkoutItem {
  id: string;
  name: string;
  duration: string;
  reps?: number;
  completed?: boolean;
}

interface DaySchedule {
  id: string;
  day: string;
  date: string;
  workouts: WorkoutItem[];
  status?: 'completed' | 'active' | 'upcoming';
  isPresent?: boolean;
}

const WorkoutCard = memo(({ workout }: { workout: WorkoutItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: workout.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 rounded bg-primary-blue-300 text-white shadow-md"
      role="button"
      aria-label={`Workout: ${workout.name}`}
    >
      <div className={cn('mb-1', workout.completed && 'line-through')}>
        {workout.name}
      </div>
      <div className="text-sm">
        {workout.duration}
        {workout.reps && `, ${workout.reps} reps`}
      </div>
    </div>
  );
});

WorkoutCard.displayName = 'WorkoutCard';

export function WorkoutPlans() {
  const initialSchedule: DaySchedule[] = [
    {
      id: 'day-1',
      day: 'Monday',
      date: '02/11/2024',
      status: 'completed',
      isPresent: true,
      workouts: [
        {
          id: 'workout-1',
          name: 'Warm - Up',
          duration: '10 mins',
          completed: true,
        },
        {
          id: 'workout-2',
          name: 'Cardio 01',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
        {
          id: 'workout-3',
          name: 'Cardio 02',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
        {
          id: 'workout-4',
          name: 'Chest workouts',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
      ],
    },
    {
      id: 'day-2',
      day: 'Tuesday',
      date: '02/11/2024',
      status: 'completed',
      isPresent: false,
      workouts: [
        {
          id: 'workout-5',
          name: 'Warm - Up',
          duration: '10 mins',
          completed: true,
        },
        {
          id: 'workout-6',
          name: 'Cardio 01',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
        {
          id: 'workout-7',
          name: 'Cardio 02',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
        {
          id: 'workout-8',
          name: 'Chest workouts',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
      ],
    },
    {
      id: 'day-3',
      day: 'Wednesday',
      date: '02/11/2024',
      status: 'completed',
      isPresent: true,
      workouts: [
        {
          id: 'workout-9',
          name: 'Warm - Up',
          duration: '10 mins',
          completed: true,
        },
        {
          id: 'workout-10',
          name: 'Cardio 01',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
        {
          id: 'workout-11',
          name: 'Cardio 02',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
        {
          id: 'workout-12',
          name: 'Chest workouts',
          duration: '10 mins',
          reps: 3,
          completed: true,
        },
      ],
    },
    {
      id: 'day-4',
      day: 'Thursday',
      date: new Date().toLocaleDateString('en-GB'),
      status: 'active',
      isPresent: true,
      workouts: [
        { id: 'workout-13', name: 'Warm - Up', duration: '10 mins' },
        { id: 'workout-14', name: 'Cardio 01', duration: '10 mins', reps: 3 },
        { id: 'workout-15', name: 'Cardio 02', duration: '10 mins', reps: 3 },
        {
          id: 'workout-16',
          name: 'Chest workouts',
          duration: '10 mins',
          reps: 3,
        },
      ],
    },
  ];

  const [workoutSchedule, setWorkoutSchedule] =
    useState<DaySchedule[]>(initialSchedule);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setWorkoutSchedule((prev) =>
      prev.map((day) => {
        const activeIndex = day.workouts.findIndex((w) => w.id === active.id);
        const overIndex = day.workouts.findIndex((w) => w.id === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
          const updatedWorkouts = arrayMove(
            day.workouts,
            activeIndex,
            overIndex
          );
          return { ...day, workouts: updatedWorkouts };
        }

        return day;
      })
    );
  }

  return (
    <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700">
      <div className="flex gap-4">
        {workoutSchedule.map((day) => (
          <div
            key={day.id}
            className={cn(
              'min-w-[227px] rounded-lg p-4 space-y-4',
              day.date === new Date().toLocaleDateString('en-GB')
                ? 'bg-primary-blue-500'
                : 'bg-primary-blue-500 opacity-50',
              day.isPresent === true &&
                day.date !== new Date().toLocaleDateString('en-GB')
                ? 'border border-neutral-green-500/45'
                : day.isPresent === false
                  ? 'border border-alert-red-400/45'
                  : ''
            )}
            aria-label={`Day: ${day.day}, Status: ${day.status || 'upcoming'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    day.isPresent === false
                      ? 'bg-red-500'
                      : day.isPresent === true
                        ? 'bg-green-500'
                        : 'bg-zinc-500'
                  )}
                />
                <span className="text-zinc-100">{day.day}</span>
              </div>
              <span className="text-zinc-500 text-sm">{day.date}</span>
            </div>

            <div className="space-y-3 max-h-[343px] overflow-y-auto no-scrollbar">
              <DndContext
                id={day.id}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={day.workouts.map((workout) => workout.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {day.workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
