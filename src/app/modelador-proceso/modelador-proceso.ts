import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgFor } from '@angular/common';

interface ActividadNodo {
  id: number;
  name: string;
  type: string;
  description: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-modelador-proceso',
  standalone: true,
  imports: [NgFor],
  templateUrl: './modelador-proceso.html',
  styleUrl: './modelador-proceso.css',
})
export class ModeladorProcesoComponent {
  // TODO: reemplazar esto por GET /api/activities/list más adelante
  actividades: ActividadNodo[] = [
    {
      id: 1,
      name: 'Validar documentos',
      type: 'Activity',
      description: 'Revisar cédula / soportes',
      x: 100,
      y: 100,
    },
    {
      id: 2,
      name: '¿Aprobado?',
      type: 'Gateway',
      description: 'Si / No',
      x: 320,
      y: 240,
    },
    {
      id: 3,
      name: 'Juan (Analista)',
      type: 'Persona',
      description: 'Rol: Analista',
      x: 520,
      y: 120,
    },
  ];

  @ViewChildren('nodoRef') nodoRefs!: QueryList<ElementRef<HTMLDivElement>>;

  draggingId: number | null = null;
  offsetX = 0;
  offsetY = 0;
  canvasRect: DOMRect | null = null;

  // ========================
  // DRAG START
  // ========================
  onMouseDownNodo(event: MouseEvent, nodo: ActividadNodo) {
    this.draggingId = nodo.id;

    const canvasEl = document.getElementById('canvas');
    if (!canvasEl) return;
    this.canvasRect = canvasEl.getBoundingClientRect();

    const nodoEl = this.getNodoElement(nodo.id);
    if (!nodoEl) return;
    const nodoRect = nodoEl.getBoundingClientRect();

    this.offsetX = event.clientX - nodoRect.left;
    this.offsetY = event.clientY - nodoRect.top;

    nodoEl.classList.add('active');

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  // ========================
  // DRAG MOVE
  // ========================
  handleMouseMove = (event: MouseEvent) => {
    if (this.draggingId === null || !this.canvasRect) return;

    const nodo = this.actividades.find(n => n.id === this.draggingId);
    if (!nodo) return;

    const nodoEl = this.getNodoElement(nodo.id);
    if (!nodoEl) return;

    let newLeft = event.clientX - this.canvasRect.left - this.offsetX;
    let newTop = event.clientY - this.canvasRect.top - this.offsetY;

    // límites para que no salga del canvas
    const maxLeft = this.canvasRect.width - nodoEl.offsetWidth;
    const maxTop = this.canvasRect.height - nodoEl.offsetHeight;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft > maxLeft) newLeft = maxLeft;
    if (newTop > maxTop) newTop = maxTop;

    nodo.x = newLeft;
    nodo.y = newTop;
  };

  // ========================
  // DRAG END
  // ========================
  handleMouseUp = () => {
    if (this.draggingId === null) return;

    const nodoEl = this.getNodoElement(this.draggingId);
    if (nodoEl) {
      nodoEl.classList.remove('active');
    }

    const nodo = this.actividades.find(n => n.id === this.draggingId);
    if (nodo) {
      this.persistirActividad(nodo);
    }

    this.draggingId = null;

    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  // ========================
  // PUT al backend para guardar x,y
  // ========================
  persistirActividad(nodo: ActividadNodo) {
    const bodyToSend = {
      id: nodo.id,
      name: nodo.name,
      type: nodo.type,
      description: nodo.description,
      x: Math.round(nodo.x),
      y: Math.round(nodo.y),
    };

    fetch(`http://localhost:8080/api/activities/update/${nodo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyToSend),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('error guardando en backend');
        }
        return res.json();
      })
      .then(data => {
        console.log('Guardado OK en backend:', data);
      })
      .catch(err => {
        console.error('Error al guardar coords:', err);
      });
  }

  // ========================
  // Para debug visual
  // ========================
  getLayoutActual() {
    const layout: Record<number, { x: number; y: number; name: string }> = {};
    this.actividades.forEach(n => {
      layout[n.id] = { x: n.x, y: n.y, name: n.name };
    });
    return layout;
  }

  // ========================
  // Obtener el elemento HTML real del nodo
  // ========================
  getNodoElement(id: number): HTMLDivElement | null {
    const ref = this.nodoRefs.find(
      (r: ElementRef<HTMLDivElement>) =>
        Number(r.nativeElement.dataset['id']) === id
    );
    return ref?.nativeElement ?? null;
  }
}
