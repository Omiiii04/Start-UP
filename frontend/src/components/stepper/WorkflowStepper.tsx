import React from 'react';
import { WORKFLOW_STEPS, WorkflowStepId } from '../../types';
import { Check } from 'lucide-react';

interface WorkflowStepperProps {
  currentStep: WorkflowStepId;
  onStepClick?: (step: WorkflowStepId) => void;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-full pb-card p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
            15-Step End-to-End Delivery Protocol
          </span>
          <p className="font-headline text-base font-bold text-navy">
            Step {currentStep} of 15: <span className="text-primary">{WORKFLOW_STEPS[currentStep - 1]?.name}</span>
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-200 self-start sm:self-auto">
          Owner: <strong className="font-bold">{WORKFLOW_STEPS[currentStep - 1]?.owner}</strong>
        </span>
      </div>

      {/* Horizontal Stepper */}
      <div className="relative flex items-center justify-between overflow-x-auto pb-2 pt-1 scrollbar-thin">
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
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-sm'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <span>{stepMeta.step}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1.5 text-center truncate max-w-[70px] font-semibold transition-colors ${
                  isCurrent
                    ? 'text-primary font-bold'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400 group-hover:text-slate-600'
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
