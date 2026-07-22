'use client';

import { useEffect } from 'react';
import { PROJECTS } from '@constants';
import { usePortalStore, useProjectStore } from '@stores';

const ProjectPanel = () => {
  const activeIndex = useProjectStore((state) => state.activeProjectIndex);
  const setActiveProject = useProjectStore((state) => state.setActiveProject);
  const isProjectsPortal = usePortalStore((state) => state.activePortalId === 'projects');

  const project = activeIndex !== null ? PROJECTS[activeIndex] : null;
  const open = !!project && isProjectsPortal;

  // Close the panel when the projects portal is left.
  useEffect(() => {
    if (!isProjectsPortal && activeIndex !== null) {
      setActiveProject(null);
    }
  }, [isProjectsPortal, activeIndex, setActiveProject]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    document.body.addEventListener('keydown', onKey);
    return () => document.body.removeEventListener('keydown', onKey);
  }, [open, setActiveProject]);

  if (!project) return null;

  return (
    <div className={`project-panel ${open ? 'is-open' : ''}`} role="dialog" aria-modal="false">
      <div className="pp-card" key={activeIndex}>
        <button className="pp-close" aria-label="Close" onClick={() => setActiveProject(null)}>×</button>

        <div className="pp-head">
          <div className="pp-eyebrow">
            {project.icon && <span className="pp-emoji">{project.icon}</span>}
            <span>{project.type ?? 'Project'}</span>
            <span className="pp-dot-sep">·</span>
            <span>{project.date}</span>
          </div>
          <h2 className="pp-title">{project.title}</h2>
          {project.tagline && <p className="pp-tagline"><span className="pp-dot" />{project.tagline}</p>}
        </div>

        {project.flow && project.flow.length > 0 && (
          <div className="pp-flow">
            <div className="pp-flow-label">{project.flowTitle ?? 'HOW IT WORKS'}</div>
            <div className="pp-flow-steps">
              {project.flow.map((step, i) => (
                <div className="pp-step-wrap" key={i}>
                  <div className={`pp-step ${step.muted ? 'is-muted' : ''}`}>
                    <div className="pp-step-label">{step.label}</div>
                    {step.sub && <div className="pp-step-sub">{step.sub}</div>}
                  </div>
                  {i < project.flow!.length - 1 && <span className="pp-connector" aria-hidden>—</span>}
                </div>
              ))}
            </div>
            {project.flowCaption && <p className="pp-flow-caption">{project.flowCaption}</p>}
          </div>
        )}

        {project.tech && project.tech.length > 0 && (
          <div className="pp-tech">
            {project.tech.map((t, i) => <span className="pp-chip" key={i}>{t}</span>)}
          </div>
        )}

        {project.sections?.map((section, i) => (
          <div className="pp-section" key={i}>
            <div className="pp-section-heading">{section.heading}</div>
            <p className="pp-section-body">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPanel;
