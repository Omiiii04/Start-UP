import React from 'react';
import { WORKFLOW_STEPS, WorkflowStepId } from '../../types';
import { Check } from 'lucide-react';

interface WorkflowStepperProps {
  currentStep: WorkflowStepId;
  onStepClick?: (step: WorkflowStepId) => void;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full pb-card p-4 sm:p-5 shadow-sm hover-lift relative overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-zinc-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-radar-ping"></span>
            15-Step End-to-End Delivery Protocol
          </span>
          <p className="font-headline text-sm sm:text-base font-bold text-white mt-0.5">
            Step {currentStep} of 15: <span className="text-primary-light">{WORKFLOW_STEPS[currentStep - 1]?.name}</span>
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-primary/15 text-primary-light border border-primary/30 self-start sm:self-auto shadow-sm">
          Owner: <strong className="font-bold text-white">{WORKFLOW_STEPS[currentStep - 1]?.owner}</strong>
        </span>
      </div>

      {/* Horizontal Stepper */}
      <div className="relative flex items-center justify-between overflow-x-auto pb-2 pt-1 scrollbar-thin scroll-smooth">
        {WORKFLOW_STEPS.map((stepMeta) => {
          const isCompleted = stepMeta.step < currentStep;
          const isCurrent = stepMeta.step === currentStep;

          return (
            <div
              key={stepMeta.step}
              onClick={() => onStepClick && onStepClick(stepMeta.step)}
              className="flex flex-col items-center min-w-[72px] cursor-pointer group transition-all"
            >
              {/* Node Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-sm group-hover:scale-110'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/30 scale-110 shadow-glow animate-glow-pulse'
                    : 'bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-white group-hover:scale-105 border border-white/10'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5] animate-scale-in" />
                ) : (
                  <span>{stepMeta.step}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1.5 text-center truncate max-w-[70px] font-semibold transition-colors duration-200 ${
                  isCurrent
                    ? 'text-primary-light font-bold'
                    : isCompleted
                    ? 'text-zinc-200'
                    : 'text-zinc-400 group-hover:text-zinc-200'
                }`}
                title={`${stepMeta.step}. ${stepMeta.name} (${stepMeta.owner})`}
              >
                {stepMeta.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
